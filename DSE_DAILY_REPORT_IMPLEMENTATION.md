# Daily DSE Report Feature - Implementation Guide

## Overview
This guide explains how to implement automated daily DSE market report downloads, OpenAI processing, admin approval workflow, and display on the news page.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Scheduled Task (Daily)                   │
├─────────────────────────────────────────────────────────────┤
│  1. Download DSE Report (from link above)                   │
│  2. Parse PDF/Extract Text                                  │
│  3. Send to OpenAI for Summary & Analysis                   │
│  4. Store in Database as "Pending Review"                   │
└─────────────────────────────────┬───────────────────────────┘
                                  │
                                  ▼
                    ┌─────────────────────────────┐
                    │   Admin Portal Review       │
                    │  (/admin/reports)           │
                    │  - View AI Summary          │
                    │  - Edit/Approve/Reject      │
                    │  - Add comments             │
                    └──────────────┬──────────────┘
                                   │
                              ┌────▼────┐
                              │ Approved?
                              └────┬────┘
                         ┌────────┼────────┐
                      YES│              NO │
                         ▼                ▼
                    ┌─────────┐      ┌──────────┐
                    │Database │      │ Send to  │
                    │(Publish)│      │ News Page│
                    └─────────┘      └──────────┘
                         │
                         ▼
                 ┌────────────────┐
                 │   News Page    │
                 │ (Display daily)│
                 └────────────────┘
```

## Implementation Steps

### Step 1: Set Up Backend Infrastructure

#### 1.1 Install Required Dependencies
```bash
npm install prisma @prisma/client openai pdf-parse axios node-cron dotenv
npm install -D @types/node-cron
```

**What each does:**
- `prisma` - Database ORM (easy to use)
- `openai` - OpenAI API client
- `pdf-parse` - Extract text from PDF reports
- `axios` - HTTP client for downloading files
- `node-cron` - Schedule daily tasks
- `dotenv` - Environment variables

#### 1.2 Set Up Prisma Database

Install PostgreSQL or use a cloud database:
```bash
# Use a free PostgreSQL service like:
# - Railway.app (free tier)
# - Render.com (free tier)
# - Supabase.com (5 projects free)
# - PlanetScale MySQL alternative

npm install -D prisma
npx prisma init
```

Create `prisma/schema.prisma`:
```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"  // or mysql, sqlite for local dev
  url      = env("DATABASE_URL")
}

model DailyReport {
  id            String   @id @default(cuid())
  date          DateTime @default(now())
  
  // Report Content
  rawReport     String   @db.Text      // Original PDF text
  aiSummary     String   @db.Text      // Summary from OpenAI
  analysis      String?  @db.Text      // Market analysis from OpenAI
  keyPoints     String[] @default([])  // Key bullet points
  imageUrl      String?  // Thumbnail/cover image
  
  // Admin Approval Workflow
  status        String   @default("pending")  // pending, approved, rejected
  approvedBy    String?  // Admin email who approved
  approvedAt    DateTime?
  rejectionReason String?
  adminComments String?  @db.Text
  
  // Publishing
  publishedAt   DateTime?
  isPublished   Boolean  @default(false)
  
  // SEO/News Fields
  slug          String   @unique
  title         String
  excerpt       String
  category      String   @default("Market Update")
  
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

model Admin {
  id       String @id @default(cuid())
  email    String @unique
  password String // Hash this! Don't store plain text
  role     String @default("manager") // admin, manager
  name     String
  
  approvals DailyReport[]
  createdAt DateTime @default(now())
}
```

Setup database:
```bash
npx prisma migrate dev --name init
npx prisma generate
```

### Step 2: Create API Routes for Report Management

#### 2.1 Download & Process Report (`src/app/api/reports/download-daily/route.ts`)
```typescript
import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'
import pdfParse from 'pdf-parse'
import { OpenAI } from 'openai'
import { prisma } from '@/lib/prisma'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: NextRequest) {
  try {
    // 1. Download DSE Daily Report
    const reportUrl = 'https://dse.co.tz/get/daily/report/eyJpdiI6ImNTYit2bGNwVHVtVlZxWjF5NnZOc0E9PSIsInZhbHVlIjoiRW41czloMkVSNmhVTXNlYTJKOVZjQT09IiwibWFjIjoiZDI2YTM3MGNhMzY1MTE3Zjk5NDUyMjgxNzNlZWQzMDdjMTgwYzA1MTNkN2EzMmFjZDgwYzM4Mzc4MTQyODU5MyIsInRhZyI6IiJ9'
    
    const response = await axios.get(reportUrl, {
      responseType: 'arraybuffer',
      timeout: 30000,
    })
    
    // 2. Parse PDF to extract text
    const pdfBuffer = Buffer.from(response.data)
    const pdfData = await pdfParse(pdfBuffer)
    const reportText = pdfData.text
    
    // 3. Send to OpenAI for processing
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: `You are a financial analyst. Analyze the DSE (Dar es Salaam Stock Exchange) daily market report and provide:
1. A comprehensive summary (max 300 words)
2. Key market movements
3. Top gainers and losers
4. Market sentiment and trends
5. Analyst recommendations

Format the response as JSON with keys: summary, keyMovements, topPerformers, bottomPerformers, sentiment, recommendations`
        },
        {
          role: 'user',
          content: `Analyze this DSE market report:\n\n${reportText}`
        }
      ],
      temperature: 0.7,
      max_tokens: 1500,
    })
    
    const aiAnalysis = JSON.parse(completion.choices[0].message.content || '{}')
    
    // 4. Create slug from date
    const today = new Date().toISOString().split('T')[0]
    const slug = `dse-market-report-${today}`
    
    // 5. Save to database as pending review
    const report = await prisma.dailyReport.create({
      data: {
        date: new Date(),
        rawReport: reportText,
        aiSummary: aiAnalysis.summary || '',
        analysis: JSON.stringify(aiAnalysis, null, 2),
        keyPoints: [
          aiAnalysis.keyMovements?.slice(0, 3) || [],
          aiAnalysis.sentiment || '',
        ].filter(Boolean),
        title: `DSE Market Report - ${today}`,
        excerpt: aiAnalysis.summary?.slice(0, 150) || '',
        slug,
        status: 'pending',
        category: 'Market Update',
      }
    })
    
    return NextResponse.json({
      success: true,
      message: 'Report downloaded and processed. Awaiting admin approval.',
      reportId: report.id,
      status: report.status,
    })
    
  } catch (error) {
    console.error('Error downloading/processing report:', error)
    return NextResponse.json(
      { error: 'Failed to process report' },
      { status: 500 }
    )
  }
}
```

#### 2.2 Admin Approval Endpoint (`src/app/api/reports/approve/route.ts`)
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const { reportId, action, comments, adminEmail } = await req.json()
    // action = 'approve' | 'reject'
    
    if (action === 'approve') {
      const report = await prisma.dailyReport.update({
        where: { id: reportId },
        data: {
          status: 'approved',
          isPublished: true,
          publishedAt: new Date(),
          approvedBy: adminEmail,
          approvedAt: new Date(),
          adminComments: comments,
        }
      })
      
      // Now it will appear on news page automatically
      return NextResponse.json({ success: true, report })
      
    } else if (action === 'reject') {
      const report = await prisma.dailyReport.update({
        where: { id: reportId },
        data: {
          status: 'rejected',
          rejectionReason: comments,
        }
      })
      
      return NextResponse.json({ success: true, message: 'Report rejected', report })
    }
    
  } catch (error) {
    console.error('Error approving report:', error)
    return NextResponse.json(
      { error: 'Failed to approve report' },
      { status: 500 }
    )
  }
}
```

#### 2.3 Get Reports for Admin Portal (`src/app/api/reports/list/route.ts`)
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const status = req.nextUrl.searchParams.get('status') // pending, approved, rejected, all
    
    const reports = await prisma.dailyReport.findMany({
      where: status && status !== 'all' ? { status } : {},
      orderBy: { createdAt: 'desc' },
      take: 50,
    })
    
    return NextResponse.json({ reports })
    
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch reports' },
      { status: 500 }
    )
  }
}
```

### Step 3: Set Up Daily Scheduled Task

#### 3.1 Create Scheduler (`src/lib/scheduler.ts`)
```typescript
import cron from 'node-cron'
import axios from 'axios'

export function initializeScheduler() {
  // Run every day at 6 PM (after market close around 4 PM)
  cron.schedule('0 18 * * *', async () => {
    console.log('Running daily DSE report download...')
    
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/reports/download-daily`,
        {},
        {
          headers: {
            'x-api-key': process.env.INTERNAL_API_KEY,
          }
        }
      )
      console.log('Daily report processed:', response.data)
      
    } catch (error) {
      console.error('Failed to download daily report:', error)
    }
  })
  
  console.log('Report scheduler initialized')
}
```

#### 3.2 Initialize Scheduler in Root Layout (`src/app/layout.tsx`)
```typescript
import { initializeScheduler } from '@/lib/scheduler'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Initialize scheduler (only once on server start)
  if (typeof window === 'undefined') {
    initializeScheduler()
  }
  
  return (
    <html>
      <body>{children}</body>
    </html>
  )
}
```

### Step 4: Create Admin Report Management Page

#### 4.1 Admin Reports Page (`src/app/admin/reports/page.tsx`)
```typescript
'use client'
import { useState, useEffect } from 'react'
import { CheckCircle, XCircle, Clock } from 'lucide-react'

export default function AdminReportsPage() {
  const [reports, setReports] = useState<any[]>([])
  const [filter, setFilter] = useState('pending')
  const [selectedReport, setSelectedReport] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchReports()
  }, [filter])

  const fetchReports = async () => {
    try {
      const res = await fetch(`/api/reports/list?status=${filter}`)
      const data = await res.json()
      setReports(data.reports)
    } catch (error) {
      console.error('Failed to fetch reports:', error)
    } finally {
      setLoading(false)
    }
  }

  const approveReport = async (reportId: string, comments: string) => {
    try {
      await fetch('/api/reports/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reportId,
          action: 'approve',
          comments,
          adminEmail: 'admin@diamondsecurities.co.tz',
        })
      })
      fetchReports()
      setSelectedReport(null)
    } catch (error) {
      console.error('Error approving report:', error)
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Daily Market Reports</h1>

      {/* Filter Tabs */}
      <div className="flex gap-4 mb-6">
        {['pending', 'approved', 'rejected'].map(status => (
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
          </button>
        ))}
      </div>

      {/* Reports List */}
      <div className="grid gap-4">
        {reports.map(report => (
          <div
            key={report.id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setSelectedReport(report)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{report.title}</h3>
                <p className="text-gray-600 text-sm">{report.excerpt}</p>
                <p className="text-xs text-gray-500 mt-2">
                  {new Date(report.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="ml-4">
                {report.status === 'pending' && (
                  <Clock className="text-yellow-500" size={24} />
                )}
                {report.status === 'approved' && (
                  <CheckCircle className="text-green-500" size={24} />
                )}
                {report.status === 'rejected' && (
                  <XCircle className="text-red-500" size={24} />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Report Detail Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-2xl font-bold mb-4">{selectedReport.title}</h2>
            
            <div className="prose prose-sm mb-6">
              <h3>AI Summary</h3>
              <p>{selectedReport.aiSummary}</p>

              <h3>Analysis</h3>
              <pre className="bg-gray-100 p-4 rounded text-xs overflow-x-auto">
                {selectedReport.analysis}
              </pre>
            </div>

            {selectedReport.status === 'pending' && (
              <div className="flex gap-4">
                <button
                  onClick={() => approveReport(selectedReport.id, '')}
                  className="flex-1 bg-emerald-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-600"
                >
                  Approve & Publish
                </button>
                <button
                  onClick={() => {
                    // Similar to approve, but with "reject" action
                  }}
                  className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600"
                >
                  Reject
                </button>
              </div>
            )}

            <button
              onClick={() => setSelectedReport(null)}
              className="w-full mt-4 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
```

### Step 5: Update News Page to Display Approved Reports

#### 5.1 Update News Page Component (`src/components/NewsPageContent.tsx`)
```typescript
'use client'
import { useEffect, useState } from 'react'

export default function NewsPageContent() {
  const [articles, setArticles] = useState<any[]>([])

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // Fetch approved reports from API
        const res = await fetch('/api/reports/list?status=approved')
        const { reports } = await res.json()
        
        // Convert reports to article format
        const reportArticles = reports.map(report => ({
          id: report.id,
          title: report.title,
          category: report.category,
          date: new Date(report.publishedAt).toLocaleDateString(),
          image: report.imageUrl || 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=250&fit=crop',
          excerpt: report.excerpt,
          readTime: '5 min read',
          content: report.aiSummary,
        }))
        
        setArticles(reportArticles)
      } catch (error) {
        console.error('Failed to fetch articles:', error)
      }
    }

    fetchArticles()
  }, [])

  return (
    <div className="space-y-6">
      {articles.map(article => (
        <article
          key={article.id}
          className="bg-white rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
        >
          <img src={article.image} alt={article.title} className="w-full h-64 object-cover" />
          <div className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                {article.category}
              </span>
              <span className="text-xs text-gray-500">{article.date}</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{article.title}</h3>
            <p className="text-gray-600 mb-4">{article.excerpt}</p>
            <button className="text-emerald-600 font-semibold hover:text-emerald-700">
              Read Full Report →
            </button>
          </div>
        </article>
      ))}
    </div>
  )
}
```

### Step 6: Environment Variables

Create `.env.local`:
```bash
# Database
DATABASE_URL="postgresql://user:password@host:port/database"

# OpenAI
OPENAI_API_KEY="sk-..."

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
INTERNAL_API_KEY="your-secret-key-for-scheduler"
```

### Step 7: Install & Run

```bash
# Install all dependencies
npm install prisma @prisma/client openai pdf-parse axios node-cron

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your DATABASE_URL and OPENAI_API_KEY

# Run database migrations
npx prisma migrate dev

# Start development server
npm run dev
```

## Workflow Summary

### Daily Automation (6 PM)
1. Scheduler triggers → Download DSE report PDF
2. Extract text from PDF
3. Send to OpenAI GPT-4 for analysis
4. Save to database with status "pending"
5. Admin notification (optional)

### Admin Review
1. Admin logs into `/admin/reports`
2. Reviews AI summary and analysis
3. Clicks "Approve & Publish"
4. Report status changes to "approved"
5. Automatically appears on `/news` page

### Public Display
1. News page fetches approved reports
2. Latest report at top of news feed
3. User can read full report
4. Timestamps and categories displayed

## Alternative Lightweight Approach (No Database)

If you don't want to set up a database yet, you can:

1. Store reports as JSON files in `public/reports/`
2. Use a simple file-based approval system
3. Still use OpenAI for processing
4. Use `node-cron` for scheduling

This avoids database setup but still provides the feature.

## Security Considerations

1. **API Keys** - Use environment variables (never commit to git)
2. **Authentication** - Implement proper JWT/session auth for admin
3. **Authorization** - Only admins can approve/reject reports
4. **Rate Limiting** - Limit API calls to prevent abuse
5. **Input Validation** - Validate file uploads and API responses
6. **HTTPS Only** - Always use HTTPS in production

## Cost Estimation

- **OpenAI API**: ~$0.01-0.05 per report (GPT-4 Turbo)
- **Database**: Free tier options available (Supabase, Railway, Render)
- **Hosting**: Vercel free tier includes serverless functions
- **Total Monthly**: $0-10 depending on setup

## Additional Features (Phase 2)

- [ ] Email notifications when reports are approved
- [ ] Report analytics (views, shares, engagement)
- [ ] Custom AI prompts for different market conditions
- [ ] Webhook notifications to internal systems
- [ ] PDF generation of approved reports
- [ ] Report archive/history
- [ ] Multiple language versions

Would you like me to implement any specific part of this solution?
