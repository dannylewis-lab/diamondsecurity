# Daily DSE Report System - Visual Guide

## How It Works - Visual Flow

```
TIME: 5:00 PM (Daily, Monday-Friday)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔄 AUTOMATED SCHEDULER (node-cron)
   └─ Triggers: /api/reports/process

📥 STEP 1: DOWNLOAD PDF
   URL: https://dse.co.tz/get/daily/report/...
   ├─ Download DSE daily report
   ├─ Extract text from PDF
   └─ Save raw content

🤖 STEP 2: OPENAI PROCESSING
   ├─ Send text to GPT-3.5 or GPT-4
   ├─ AI generates:
   │  ├─ Executive Summary (100-150 words)
   │  ├─ Market Overview
   │  ├─ Top 3 Gainers & Losers
   │  ├─ Trading Volume Analysis
   │  └─ Market Sentiment
   └─ Structured JSON response

💾 STEP 3: STORE REPORT
   Status: "PENDING" ⏳
   ├─ Save to database (or JSON file)
   ├─ Generated content
   ├─ Timestamps
   └─ Admin awaiting approval

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 ADMIN REVIEW (Next morning)
   URL: http://localhost:3000/admin/reports

   ┌─────────────────────────────────────┐
   │  Pending DSE Market Report          │
   │  Date: 2026-03-24                   │
   │  Status: ⏳ PENDING APPROVAL       │
   ├─────────────────────────────────────┤
   │                                     │
   │  📋 AI Generated Summary:            │
   │  "The DSEI index showed strong      │
   │   today despite initial volatility. │
   │   Banking stocks led gains with..."  │
   │                                     │
   │  📊 Detailed Analysis:               │
   │  {                                  │
   │    "summary": "...",                │
   │    "topMovers": [...],              │
   │    "sentiment": "bullish",          │
   │    "recommendations": [...]         │
   │  }                                  │
   │                                     │
   │  💬 Admin Comments: (optional)      │
   │  [Text area for feedback]           │
   │                                     │
   │  [✓ APPROVE] [✕ REJECT]           │
   └─────────────────────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

After Admin Clicks "APPROVE":
   Status: "APPROVED" ✅
   ├─ isPublished: true
   ├─ publishedAt: timestamp
   ├─ approvedBy: admin@email.com
   └─ adminComments: saved

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📰 PUBLIC NEWS PAGE
   URL: http://localhost:3000/news

   ┌──────────────────────────────────────┐
   │ 📊 DSE MARKET REPORT - Mar 24, 2026 │◄─ FRESHEST AT TOP
   ├──────────────────────────────────────┤
   │ 📷 [Stock market chart image]        │
   │                                      │
   │ 📌 Market Update | Today | 5 min     │
   │                                      │
   │ "The DSEI index showed strong        │
   │  performance today despite initial   │
   │  volatility. Banking stocks led      │
   │  gains with..."                      │
   │                                      │
   │ [🔗 Read Full Report →]             │
   └──────────────────────────────────────┘

   ┌──────────────────────────────────────┐
   │ Previous news articles...             │
   └──────────────────────────────────────┘
```

---

## Database Schema (if using Full Enterprise)

```sql
┌─────────────────────────────────────────┐
│          DailyReport Table              │
├─────────────────────────────────────────┤
│ id                  STRING (unique)     │
│ date                DATETIME            │
│ title               TEXT                │
│                                         │
│ --- Raw & Processed ---                 │
│ rawReport           TEXT (PDF extract)  │
│ aiSummary           TEXT (OpenAI)       │
│ analysis            JSON (structured)   │
│ keyPoints           STRING[] (bullets)  │
│                                         │
│ --- Approval State ---                  │
│ status              STRING              │
│   • pending                             │
│   • approved                            │
│   • rejected                            │
│                                         │
│ approvedBy          STRING (email)      │
│ approvedAt          DATETIME            │
│ adminComments       TEXT                │
│ rejectionReason     TEXT                │
│                                         │
│ --- Publishing ---                      │
│ isPublished         BOOLEAN             │
│ publishedAt         DATETIME            │
│ slug                STRING (unique)     │
│ excerpt             TEXT (preview)      │
│ imageUrl            STRING              │
│ category            STRING              │
│                                         │
│ --- Metadata ---                        │
│ createdAt           DATETIME            │
│ updatedAt           DATETIME            │
└─────────────────────────────────────────┘
```

---

## File Structure (Quick Start)

```
diamond/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── reports/
│   │   │       ├── process/route.ts      ← Download & process
│   │   │       ├── list/route.ts         ← Fetch reports
│   │   │       └── approve/route.ts      ← Admin approval
│   │   │
│   │   ├── admin/
│   │   │   └── reports/
│   │   │       └── page.tsx              ← Admin panel
│   │   │
│   │   └── layout.tsx                    ← Init scheduler
│   │
│   ├── components/
│   │   └── NewsPageContent.tsx           ← Display on news
│   │
│   └── lib/
│       ├── reports.ts                    ← File operations
│       └── scheduler.ts                  ← Daily cron
│
├── public/
│   └── reports/                          ← JSON storage
│       ├── dse-report-2026-03-24.json
│       └── dse-report-2026-03-23.json
│
└── .env.local                            ← API keys
```

---

## API Endpoints Overview

### 1️⃣ Download & Process
```
POST /api/reports/process

Request: {} (empty)
Response: {
  "success": true,
  "message": "Report downloaded and processed",
  "reportId": "dse-report-2026-03-24-...",
  "status": "pending",
  "report": { ...full report object... }
}
```

### 2️⃣ List Reports
```
GET /api/reports/list?status=pending

Response: {
  "success": true,
  "reports": [
    {
      "id": "...",
      "title": "DSE Daily Market Report - 2026-03-24",
      "status": "pending",
      "aiSummary": "...",
      "excerpt": "...",
      "createdAt": "2026-03-24T17:30:00Z"
    }
  ],
  "count": 5
}

Query Parameters:
  ?status=pending    ← Filter by status
  ?status=approved   ← Show approved only
  ?status=rejected   ← Show rejected only
  (no param)         ← Show all
```

### 3️⃣ Approve Report
```
POST /api/reports/approve

Request: {
  "reportId": "dse-report-2026-03-24-...",
  "action": "approve",  // or "reject"
  "comments": "Looks good, matches market conditions"
}

Response: {
  "success": true,
  "message": "Report approved and published",
  "report": {
    "id": "...",
    "status": "approved",
    "approvedAt": "2026-03-25T08:15:00Z",
    "adminComments": "..."
  }
}
```

---

## Environment Variables Needed

```bash
# .env.local

# OpenAI API Key (get from https://platform.openai.com)
OPENAI_API_KEY=sk-proj-xxx...

# App URL (for scheduler to call back)
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Optional: Internal API key (prevent external calls)
INTERNAL_API_KEY=your-secret-key-here

# Database (only if using Full Enterprise)
DATABASE_URL=postgresql://user:pass@host/db
```

---

## Testing the System

### Manual Test 1: Download & Process
```bash
# Trigger the report download
curl -X POST http://localhost:3000/api/reports/process

# Should return:
# {
#   "success": true,
#   "reportId": "...",
#   "status": "pending"
# }
```

### Manual Test 2: List Pending Reports
```bash
curl http://localhost:3000/api/reports/list?status=pending

# Should return array of reports
```

### Manual Test 3: Admin Approval
```bash
curl -X POST http://localhost:3000/api/reports/approve \
  -H "Content-Type: application/json" \
  -d '{
    "reportId": "dse-report-...",
    "action": "approve",
    "comments": "Approved for publishing"
  }'
```

### Manual Test 4: Check News Page
Visit: http://localhost:3000/news

Should show the approved report at the top of news feed.

---

## Typical Daily Flow

### 5:00 PM (Automated)
```
Scheduler triggers
  ↓
Download DSE report
  ↓
Parse PDF & extract text
  ↓
Send to OpenAI for analysis
  ↓
Save to database/files with status: "pending"
  ↓
Notification sent to admin (optional)
```

### 8:00 AM Next Day (Admin Review)
```
Admin logs in
  ↓
Visits /admin/reports
  ↓
Sees "DSE Market Report - pending" 
  ↓
Reads AI summary & analysis
  ↓
Clicks "Approve"
  ↓
Status → "approved"
```

### 8:05 AM (Public Display)
```
Report automatically appears on /news page
  ↓
Users see new market report
  ↓
Can read full analysis
  ↓
System ready for tomorrow's report
```

---

## Important Notes

### ⚡ Scheduler Behavior
- `node-cron` only works while dev server is running
- For production, you MUST use external service:
  - ✅ EasyCron.com (free)
  - ✅ GitHub Actions (free for public)
  - ✅ Vercel Cron (Pro plan)
  - ✅ AWS Lambda (pay per run)

### 🔑 API Keys
- OpenAI API: ~$1-5/month depending on usage
- Free tier: $5 credit/month (renews monthly)
- Never commit `OPENAI_API_KEY` to git

### 📊 Report Storage
- Quick Start: JSON files in `public/reports/`
  - Fast to setup, slow for large datasets
  - Good for <1,000 reports

- Full Enterprise: Database
  - Faster queries, better for scaling
  - Good for 1,000+ reports

### 🔒 Security
- Update authentication before production
- Add rate limiting to API endpoints
- Hash passwords if storing admin users
- Use HTTPS in production

---

## Cost Analysis

```
✅ COMPLETELY FREE:
  - Vercel hosting (hobby tier)
  - Next.js framework
  - Node.js/npm

💰 PAID (if used):
  - OpenAI API: $0.02-0.10 per report
    = $0.50-3/month (1 report/day)
    = $10-30/month (100 reports/month)

  - Database (if Full Enterprise):
    FREE: Supabase, Railway, Render (free tiers)
    
  - Email notifications (optional):
    FREE: SendGrid (100/day limit)

TOTAL: $0-3/month for MVP
```

---

Ready? Here's your next step:

## 🎯 YOUR NEXT STEP

1. **Open and read**: `DSE_REPORT_QUICK_START.md`
   - Takes 15 minutes to read
   - Copy-paste ready code

2. **Get OpenAI API key**
   - Go to: https://platform.openai.com/api-keys
   - Create new key
   - Add to `.env.local`

3. **Follow "Step 1-4" in Quick Start**
   - Install dependencies (5 min)
   - Create API routes (30 min)
   - Create scheduler (15 min)
   - Update admin page (45 min)
   - Should be done in 2ish hours

4. **Test it**
   - Run `npm run dev`
   - Test API: `curl -X POST http://localhost:3000/api/reports/process`
   - Check `/admin/reports`
   - Approve a report
   - Verify it appears on `/news`

5. **Deploy**
   - Push to GitHub
   - Deploy to Vercel (auto)
   - Set up external cron

🎉 Done! You'll have a working daily DSE report system!
