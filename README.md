# Diamond Securities — Next.js Website

A full-stack financial website for Diamond Securities, a Licensed DSE (Dar es Salaam Stock Exchange) Broker. Built with Next.js 14, TypeScript, Tailwind CSS, and Recharts.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# 1. Navigate to the project
cd diamond-securities

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx              # Home page
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles
│   ├── market/page.tsx       # Live Market page
│   ├── news/page.tsx         # News & Insights page
│   ├── contact/page.tsx      # Contact page
│   └── admin/
│       ├── layout.tsx        # Admin layout (sidebar)
│       ├── page.tsx          # Admin Overview
│       ├── news/page.tsx     # News Management
│       ├── reports/page.tsx  # AI Reports
│       ├── inquiries/page.tsx# Inquiries
│       ├── documents/page.tsx# Document Management
│       └── settings/page.tsx # Settings
├── components/
│   ├── Navbar.tsx            # Top navigation
│   ├── Footer.tsx            # Footer
│   ├── FloatingButtons.tsx   # WhatsApp + Scroll-to-top
│   ├── HeroSection.tsx       # Hero with live market widget
│   ├── ServicesSection.tsx   # Stats + Services cards
│   ├── MarketDashboard.tsx   # Market dashboard + chart + table
│   └── Sections.tsx          # AI Insights, News, Downloads, WhatsApp, Inquiry
└── lib/
    └── data.ts               # Mock data (stocks, news, documents, etc.)
```

---

## 📄 Pages

| Route | Description |
|-------|-------------|
| `/` | Home page — Hero, Stats, Services, Market, AI Insights, News, Downloads, WhatsApp, Inquiry, Footer |
| `/market` | Full Live Market Dashboard |
| `/news` | News & Insights portal |
| `/contact` | Contact + WhatsApp + Inquiry form |
| `/admin` | Admin Dashboard Overview |
| `/admin/news` | Create/Edit/Delete articles |
| `/admin/reports` | View & publish AI market reports |
| `/admin/inquiries` | View & filter form submissions |
| `/admin/documents` | Upload & manage downloadable documents |
| `/admin/settings` | Company info, API keys, settings |

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Navy (Primary) | `#1a2744` |
| Emerald (Accent) | `#10b981` |
| Background | `#f9fafb` |
| Border | `#e5e7eb` |

---

## 🔧 Customization

### Update stock data
Edit `src/lib/data.ts` — update `stockData`, `indices`, and `dseiChartData`.

### Connect real API
Replace mock data in `src/lib/data.ts` with `fetch()` calls to the DSE API or your backend.

### Add authentication to Admin
Wrap `/admin` routes with NextAuth.js or a middleware check in `middleware.ts`.

---

## 📦 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **Fonts**: System sans-serif (swap with Google Fonts as needed)

---

## 🌐 Deployment

```bash
# Build for production
npm run build

# Start production server
npm start
```

Deploy to Vercel with one click — connect your GitHub repo at [vercel.com](https://vercel.com).

---

© 2026 Diamond Securities. All rights reserved.
