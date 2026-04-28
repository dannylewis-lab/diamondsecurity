# DSE Daily Report - Quick Start (No Database)

If you want to start implementing this feature without setting up a database, here's a lightweight approach using JSON files and the filesystem.

## Quick Implementation (2-3 hours)

### Step 1: Install Minimal Dependencies

```bash
npm install openai pdf-parse axios node-cron dotenv
```

### Step 2: Create Report Statistics Store

Create `src/lib/reports.ts`:

```typescript
import fs from 'fs/promises'
import path from 'path'

const REPORTS_DIR = path.join(process.cwd(), 'public', 'reports')

export interface DailyReport {
  id: string
  date: string
  title: string
  status: 'pending' | 'approved' | 'rejected'
  aiSummary: string
  analysis: string
  excerpt: string
  createdAt: string
  approvedAt?: string
  rejectionReason?: string
  adminComments?: string
}

// Ensure reports directory exists
export async function ensureReportsDir() {
  try {
    await fs.mkdir(REPORTS_DIR, { recursive: true })
  } catch (error) {
    console.error('Error creating reports directory:', error)
  }
}

export async function saveReport(report: DailyReport) {
  await ensureReportsDir()
  const filePath = path.join(REPORTS_DIR, `${report.id}.json`)
  await fs.writeFile(filePath, JSON.stringify(report, null, 2))
}

export async function getReport(id: string): Promise<DailyReport | null> {
  try {
    const filePath = path.join(REPORTS_DIR, `${id}.json`)
    const content = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(content)
  } catch {
    return null
  }
}

export async function getAllReports(status?: string): Promise<DailyReport[]> {
  try {
    await ensureReportsDir()
    const files = await fs.readdir(REPORTS_DIR)
    const reports: DailyReport[] = []

    for (const file of files) {
      if (file.endsWith('.json')) {
        const content = await fs.readFile(path.join(REPORTS_DIR, file), 'utf-8')
        const report = JSON.parse(content)
        if (!status || report.status === status) {
          reports.push(report)
        }
      }
    }

    return reports.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  } catch (error) {
    console.error('Error reading reports:', error)
    return []
  }
}

export async function updateReportStatus(
  id: string,
  status: 'approved' | 'rejected',
  data?: { approvedAt?: string; rejectionReason?: string; adminComments?: string }
) {
  const report = await getReport(id)
  if (!report) return null

  const updated = {
    ...report,
    status,
    ...data,
  }

  await saveReport(updated)
  return updated
}
```

### Step 3: Create Download & Process API

Create `src/app/api/reports/process/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'
import pdfParse from 'pdf-parse'
import { OpenAI } from 'openai'
import { saveReport, getReport, getAllReports } from '@/lib/reports'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: NextRequest) {
  try {
    // Check if report already processed today
    const today = new Date().toISOString().split('T')[0]
    const existingReports = await getAllReports()
    const todayReport = existingReports.find(r => r.date === today)

    if (todayReport) {
      return NextResponse.json({
        success: false,
        message: 'Report already processed for today',
        reportId: todayReport.id,
      })
    }

    console.log('Downloading DSE report...')

    // 1. Download DSE Daily Report
    const reportUrl = 'https://dse.co.tz/get/daily/report/eyJpdiI6ImNTYit2bGNwVHVtVlZxWjF5NnZOc0E9PSIsInZhbHVlIjoiRW41czloMkVSNmhVTXNlYTJKOVZjQT09IiwibWFjIjoiZDI2YTM3MGNhMzY1MTE3Zjk5NDUyMjgxNzNlZWQzMDdjMTgwYzA1MTNkN2EzMmFjZDgwYzM4Mzc4MTQyODU5MyIsInRhZyI6IiJ9'

    const response = await axios.get(reportUrl, {
      responseType: 'arraybuffer',
      timeout: 30000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; MarketBot/1.0)',
      }
    })

    // 2. Parse PDF to extract text
    const pdfBuffer = Buffer.from(response.data)
    const pdfData = await pdfParse(pdfBuffer)
    const reportText = pdfData.text

    console.log('Processing with OpenAI...')

    // 3. Send to OpenAI for processing
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // Use cheaper model - adjust as needed
      messages: [
        {
          role: 'system',
          content: `You are a financial analyst for the Dar es Salaam Stock Exchange (DSE). 
Analyze the daily market report and provide:
1. Executive Summary (100-150 words)
2. Market Performance Overview
3. Top 3 Gainers and Losers
4. Trading Volume Insights
5. Market Sentiment

Format response as JSON with keys: summary, overview, topMovers, volume, sentiment`
        },
        {
          role: 'user',
          content: `Analyze this DSE daily report:\n\n${reportText.substring(0, 3000)}`
        }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    })

    let aiAnalysis = {}
    try {
      aiAnalysis = JSON.parse(completion.choices[0].message.content || '{}')
    } catch {
      aiAnalysis = {
        summary: completion.choices[0].message.content,
      }
    }

    // 4. Create report ID and data
    const reportId = `dse-report-${today}-${Date.now()}`
    const report = {
      id: reportId,
      date: today,
      title: `DSE Daily Market Report - ${today}`,
      status: 'pending' as const,
      aiSummary: aiAnalysis.summary || '',
      analysis: JSON.stringify(aiAnalysis, null, 2),
      excerpt: (aiAnalysis.summary || '').substring(0, 150) + '...',
      createdAt: new Date().toISOString(),
    }

    // 5. Save report
    await saveReport(report)

    console.log('Report processed successfully:', reportId)

    return NextResponse.json({
      success: true,
      message: 'Report downloaded and processed. Awaiting admin approval.',
      reportId: report.id,
      status: report.status,
      report,
    })

  } catch (error) {
    console.error('Error downloading/processing report:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to process report'
      },
      { status: 500 }
    )
  }
}
```

### Step 4: Create Report List API

Create `src/app/api/reports/list/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { getAllReports } from '@/lib/reports'

export async function GET(req: NextRequest) {
  try {
    const status = req.nextUrl.searchParams.get('status')
    const reports = await getAllReports(status || undefined)

    return NextResponse.json({ 
      success: true,
      reports,
      count: reports.length,
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch reports' },
      { status: 500 }
    )
  }
}
```

### Step 5: Create Approval API

Create `src/app/api/reports/approve/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { updateReportStatus } from '@/lib/reports'

export async function POST(req: NextRequest) {
  try {
    const { reportId, action, comments } = await req.json()

    if (action === 'approve') {
      const report = await updateReportStatus(reportId, 'approved', {
        approvedAt: new Date().toISOString(),
        adminComments: comments,
      })

      return NextResponse.json({
        success: true,
        message: 'Report approved and published',
        report,
      })

    } else if (action === 'reject') {
      const report = await updateReportStatus(reportId, 'rejected', {
        rejectionReason: comments,
      })

      return NextResponse.json({
        success: true,
        message: 'Report rejected',
        report,
      })
    }

    return NextResponse.json(
      { success: false, error: 'Invalid action' },
      { status: 400 }
    )

  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to approve report' },
      { status: 500 }
    )
  }
}
```

### Step 6: Create Scheduler

Create `src/lib/scheduler.ts`:

```typescript
import cron from 'node-cron'

export function initializeScheduler() {
  // Run daily at 5 PM (after market closes at 4 PM)
  cron.schedule('0 17 * * 1-5', async () => {
    console.log('⏰ Running daily DSE report processor...')

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/reports/process`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }
        }
      )

      const data = await response.json()
      console.log('✅ Report processed:', data.message)

      // Optional: Send email notification
      if (data.success) {
        console.log(`📧 New report ${data.reportId} awaiting approval`)
        // Add email notification here if you want
      }

    } catch (error) {
      console.error('❌ Failed to process daily report:', error)
    }
  })

  console.log('📅 Scheduler initialized - runs daily at 5 PM (Mon-Fri)')
}
```

### Step 7: Initialize Scheduler

Update your `src/app/layout.tsx`:

```typescript
'use client'
import { useEffect } from 'react'
import { initializeScheduler } from '@/lib/scheduler'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Initialize scheduler on client side (works for development)
  // For production, use a service like EasyCron or AWS Lambda
  useEffect(() => {
    initializeScheduler()
  }, [])

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

### Step 8: Update Admin Reports Page

Create `src/app/admin/reports/page.tsx`:

```typescript
'use client'
import { useState, useEffect } from 'react'
import { CheckCircle, XCircle, Clock } from 'lucide-react'

export default function AdminReportsPage() {
  const [reports, setReports] = useState<any[]>([])
  const [filter, setFilter] = useState('pending')
  const [selectedReport, setSelectedReport] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [approvalComments, setApprovalComments] = useState('')

  const fetchReports = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/reports/list?status=${filter === 'all' ? '' : filter}`)
      const data = await res.json()
      setReports(data.reports || [])
    } catch (error) {
      console.error('Failed to fetch reports:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchReports()
  }, [filter])

  const handleApprove = async (reportId: string) => {
    try {
      const res = await fetch('/api/reports/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reportId,
          action: 'approve',
          comments: approvalComments,
        })
      })

      const data = await res.json()
      if (data.success) {
        alert('✅ Report approved and published!')
        setSelectedReport(null)
        setApprovalComments('')
        fetchReports()
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleReject = async (reportId: string) => {
    if (!approvalComments) {
      alert('Please provide a reason for rejection')
      return
    }

    try {
      const res = await fetch('/api/reports/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reportId,
          action: 'reject',
          comments: approvalComments,
        })
      })

      const data = await res.json()
      if (data.success) {
        alert('❌ Report rejected')
        setSelectedReport(null)
        setApprovalComments('')
        fetchReports()
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">DSE Daily Market Reports</h1>

      {/* Filter Buttons */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {['pending', 'approved', 'rejected', 'all'].map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === status
                ? 'bg-emerald-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
            {reports.length > 0 && status !== 'all' && ` (${reports.length})`}
          </button>
        ))}
      </div>

      {/* Reports Grid */}
      <div className="grid gap-4 mb-6">
        {loading ? (
          <p className="text-center text-gray-500 py-8">Loading reports...</p>
        ) : reports.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No reports found</p>
        ) : (
          reports.map(report => (
            <div
              key={report.id}
              className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedReport(report)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-900">{report.title}</h3>
                  <p className="text-gray-600 text-sm mt-1 line-clamp-2">{report.excerpt}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    Submitted: {new Date(report.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="ml-4 flex items-center justify-center w-12 h-12">
                  {report.status === 'pending' && (
                    <Clock className="text-yellow-500" size={28} />
                  )}
                  {report.status === 'approved' && (
                    <CheckCircle className="text-green-500" size={28} />
                  )}
                  {report.status === 'rejected' && (
                    <XCircle className="text-red-500" size={28} />
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Detail Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-gray-50 border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">{selectedReport.title}</h2>
              <button
                onClick={() => setSelectedReport(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Summary */}
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900">AI-Generated Summary</h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-gray-700 leading-relaxed">{selectedReport.aiSummary}</p>
                </div>
              </div>

              {/* Analysis */}
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900">Detailed Analysis</h3>
                <pre className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm overflow-x-auto text-gray-700">
                  {selectedReport.analysis}
                </pre>
              </div>

              {/* Status */}
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600">
                  <strong>Status:</strong>{' '}
                  <span className={`font-semibold ${
                    selectedReport.status === 'approved' ? 'text-green-600' :
                    selectedReport.status === 'rejected' ? 'text-red-600' :
                    'text-yellow-600'
                  }`}>
                    {selectedReport.status.toUpperCase()}
                  </span>
                </p>
                {selectedReport.approvedAt && (
                  <p className="text-sm text-gray-600 mt-2">
                    <strong>Approved:</strong> {new Date(selectedReport.approvedAt).toLocaleDateString()}
                  </p>
                )}
              </div>

              {/* Action Area */}
              {selectedReport.status === 'pending' && (
                <div className="space-y-4 border-t border-gray-200 pt-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Admin Comments (Optional)
                    </label>
                    <textarea
                      value={approvalComments}
                      onChange={e => setApprovalComments(e.target.value)}
                      placeholder="Add any comments or feedback..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                      rows={3}
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleApprove(selectedReport.id)}
                      className="flex-1 bg-emerald-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-600 transition-colors"
                    >
                      ✓ Approve & Publish
                    </button>
                    <button
                      onClick={() => handleReject(selectedReport.id)}
                      className="flex-1 bg-red-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-600 transition-colors"
                    >
                      ✕ Reject
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
```

### Step 9: Update News Page

Update `src/components/NewsPageContent.tsx`:

```typescript
'use client'
import { useEffect, useState } from 'react'

export default function NewsPageContent() {
  const [articles, setArticles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // Fetch approved DSE reports
        const res = await fetch('/api/reports/list?status=approved')
        const data = await res.json()

        // Convert reports to article format
        const dseArticles = (data.reports || []).map((report: any) => ({
          id: report.id,
          title: report.title,
          category: 'DSE Market Report',
          date: new Date(report.createdAt).toLocaleDateString(),
          excerpt: report.excerpt,
          content: report.aiSummary,
          readTime: '5 min read',
          image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop',
        }))

        setArticles(dseArticles)
      } catch (error) {
        console.error('Failed to fetch articles:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  if (loading) {
    return <div className="text-center py-12">Loading news...</div>
  }

  if (articles.length === 0) {
    return <div className="text-center py-12 text-gray-500">No market reports available yet</div>
  }

  return (
    <div className="space-y-6">
      {articles.map((article, i) => (
        <article
          key={article.id}
          className={`bg-white rounded-xl overflow-hidden hover:shadow-lg transition-shadow ${
            i === 0 ? 'border-2 border-emerald-500' : ''
          }`}
        >
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                {article.category}
              </span>
              <span className="text-xs text-gray-500">{article.date}</span>
              <span className="text-xs text-gray-500">{article.readTime}</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">{article.title}</h3>
            <p className="text-gray-600 leading-relaxed mb-4">{article.excerpt}</p>
            <button className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors">
              Read Full Report →
            </button>
          </div>
        </article>
      ))}
    </div>
  )
}
```

### Step 10: Setup Environment Variables

Create/Update `.env.local`:

```bash
# OpenAI
OPENAI_API_KEY="sk-your-openai-api-key"

# App URLs
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Step 11: Run It!

```bash
# Install dependencies
npm install openai pdf-parse axios node-cron

# Test the API endpoint
curl -X POST http://localhost:3000/api/reports/process

# Start dev server
npm run dev

# Visit:
# - Admin reports: http://localhost:3000/admin/reports
# - News page: http://localhost:3000/news
```

## How It Works

1. **Daily at 5 PM (Mon-Fri)** → Scheduler triggers report download
2. **PDF Processing** → Text extracted from DSE report
3. **OpenAI Analysis** → GPT processes and summarizes
4. **JSON File Storage** → Report saved in `public/reports/`
5. **Pending Review** → Admin sees it in `/admin/reports`
6. **Admin Approval** → Clicks "Approve & Publish"
7. **Auto Display** → News page fetches & displays approved reports

## Files Created

- `src/lib/reports.ts` - File-based report storage
- `src/app/api/reports/process/route.ts` - Download & process
- `src/app/api/reports/list/route.ts` - Fetch reports API
- `src/app/api/reports/approve/route.ts` - Admin approval API
- `src/lib/scheduler.ts` - Daily scheduling
- `src/app/admin/reports/page.tsx` - Admin panel
- `.env.local` - OpenAI API key

## Advantages

✅ No database setup needed  
✅ Runs in Next.js (no separate backend)  
✅ Easy to understand and modify  
✅ Low cost (just OpenAI API)  
✅ Works with Vercel deployment  

## Limitations

❌ Scheduler only works during development (need alternative for production)  
❌ Reports stored as JSON files (slower with many reports)  
❌ No user authentication (add NextAuth for security)  

## Production Deployment

For production, use a cron service instead of `node-cron`:

- **EasyCron.com** (free tier available)
- **AWS Lambda + EventBridge** (pay as you go)
- **GitHub Actions** (free for public repos)
- **Vercel Cron Jobs** (Pro plan)

Example with EasyCron:
```
POST https://yoursite.com/api/reports/process
Run every day at 5 PM
```

This lightweight approach gets you started quickly!
