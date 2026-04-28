-- ============================================================
-- Diamond Global Securities — Supabase Schema
-- Run this entire file in: Supabase Dashboard → SQL Editor
-- ============================================================

-- ── 1. TABLES ────────────────────────────────────────────────

CREATE TABLE public.inquiries (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  name        TEXT        NOT NULL,
  email       TEXT        NOT NULL,
  phone       TEXT        NOT NULL,
  type        TEXT        NOT NULL,
  message     TEXT        NOT NULL,
  status      TEXT        NOT NULL DEFAULT 'new'
              CHECK (status IN ('new', 'reviewed', 'closed')),
  created_at  TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE public.news_articles (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  title       TEXT        NOT NULL,
  excerpt     TEXT,
  content     TEXT,
  category    TEXT        NOT NULL DEFAULT 'Article'
              CHECK (category IN ('Market Update', 'Article', 'Notice')),
  image_url   TEXT,
  published   BOOLEAN     NOT NULL DEFAULT false,
  created_at  TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at  TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE public.documents (
  id            UUID    DEFAULT gen_random_uuid() PRIMARY KEY,
  name          TEXT    NOT NULL,
  category      TEXT    NOT NULL,
  type          TEXT    NOT NULL,
  size          TEXT,
  storage_path  TEXT    NOT NULL,
  public_url    TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE public.market_reports (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  title       TEXT        NOT NULL,
  summary     TEXT,
  sentiment   TEXT        NOT NULL DEFAULT 'neutral'
              CHECK (sentiment IN ('bullish', 'bearish', 'neutral')),
  published   BOOLEAN     NOT NULL DEFAULT false,
  created_at  TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ── 2. AUTO-UPDATE updated_at ─────────────────────────────────

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER news_articles_updated_at
  BEFORE UPDATE ON public.news_articles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ── 3. ROW LEVEL SECURITY ─────────────────────────────────────

ALTER TABLE public.inquiries      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news_articles  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.market_reports ENABLE ROW LEVEL SECURITY;

-- inquiries
CREATE POLICY "Public can submit inquiries"
  ON public.inquiries FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can read inquiries"
  ON public.inquiries FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can update inquiries"
  ON public.inquiries FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can delete inquiries"
  ON public.inquiries FOR DELETE USING (auth.role() = 'authenticated');

-- news_articles
CREATE POLICY "Public can read published articles"
  ON public.news_articles FOR SELECT
  USING (published = true OR auth.role() = 'authenticated');

CREATE POLICY "Admins can insert articles"
  ON public.news_articles FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admins can update articles"
  ON public.news_articles FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can delete articles"
  ON public.news_articles FOR DELETE USING (auth.role() = 'authenticated');

-- documents
CREATE POLICY "Public can read documents"
  ON public.documents FOR SELECT USING (true);

CREATE POLICY "Admins can insert documents"
  ON public.documents FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admins can update documents"
  ON public.documents FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can delete documents"
  ON public.documents FOR DELETE USING (auth.role() = 'authenticated');

-- market_reports
CREATE POLICY "Public can read published reports"
  ON public.market_reports FOR SELECT
  USING (published = true OR auth.role() = 'authenticated');

CREATE POLICY "Admins can manage reports"
  ON public.market_reports FOR ALL USING (auth.role() = 'authenticated');

-- ── 4. STORAGE BUCKETS ────────────────────────────────────────

INSERT INTO storage.buckets (id, name, public)
VALUES ('news-images', 'news-images', true);

INSERT INTO storage.buckets (id, name, public)
VALUES ('documents', 'documents', true);

-- Storage policies — news-images
CREATE POLICY "Public read news images"
  ON storage.objects FOR SELECT USING (bucket_id = 'news-images');

CREATE POLICY "Admins upload news images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'news-images' AND auth.role() = 'authenticated');

CREATE POLICY "Admins delete news images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'news-images' AND auth.role() = 'authenticated');

-- Storage policies — documents
CREATE POLICY "Public read documents"
  ON storage.objects FOR SELECT USING (bucket_id = 'documents');

CREATE POLICY "Admins upload documents"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'documents' AND auth.role() = 'authenticated');

CREATE POLICY "Admins delete documents"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'documents' AND auth.role() = 'authenticated');
