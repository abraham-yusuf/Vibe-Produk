-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Campaigns Table (Represents a Niche/Landing Page)
create table public.campaigns (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users default auth.uid(),
  slug text unique not null, -- e.g., 'skincare-viral'
  title text not null,
  pixel_tiktok text, -- Pixel ID
  pixel_meta text,   -- Pixel ID
  gtm_id text,       -- GTM Container ID
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 2. Products Table
create table public.products (
  id uuid default uuid_generate_v4() primary key,
  campaign_id uuid references public.campaigns(id) on delete cascade,
  name text not null,
  description text,
  image_url text, -- External URL for MVP
  affiliate_url_shopee text,
  affiliate_url_tiktok text,
  cta_text_a text default 'Beli di Shopee', -- For A/B Testing
  cta_text_b text default 'Cek Promo',      -- For A/B Testing
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 3. Clicks Table (Analytics)
create table public.clicks (
  id uuid default uuid_generate_v4() primary key,
  product_id uuid references public.products(id) on delete cascade,
  platform text, -- 'shopee' or 'tiktok'
  visitor_source text, -- referer
  user_agent text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 4. Analytics RPC Function (For Dashboard)
create or replace function get_weekly_clicks()
returns table (click_date date, total_clicks bigint)
language sql
as $$
  select date(created_at) as click_date, count(*) as total_clicks
  from clicks
  where created_at > now() - interval '7 days'
  group by date(created_at)
  order by click_date asc;
$$;
