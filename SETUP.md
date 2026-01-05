# Vibe Produk ID - Setup Guide

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Supabase

#### Create a Supabase Project
1. Go to https://app.supabase.com
2. Click "New Project"
3. Fill in project details
4. Wait for database to be ready

#### Run the Database Schema
1. Open your Supabase project
2. Go to SQL Editor
3. Copy the contents of `supabase_schema.sql`
4. Paste and run the SQL

This creates:
- `campaigns` table
- `products` table  
- `clicks` table
- `get_weekly_clicks()` function

#### Get Your Credentials
1. Go to Project Settings > API
2. Copy your project URL
3. Copy your anon/public key

### 3. Configure Environment Variables

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Run the Development Server

```bash
npm run dev
```

Open http://localhost:3000

## First Time Setup

### Create Your First User

1. Go to http://localhost:3000/signup
2. Enter email and password
3. Check your email for verification (if enabled)
4. Login at http://localhost:3000/login

### Create Your First Campaign

Using Supabase Dashboard:

1. Go to Table Editor > campaigns
2. Click "Insert row"
3. Add:
   - slug: `skincare-viral` (URL-friendly)
   - title: `Skincare Viral TikTok`
   - pixel_tiktok: `YOUR_TIKTOK_PIXEL_ID` (optional)
   - pixel_meta: `YOUR_META_PIXEL_ID` (optional)
   - gtm_id: `GTM-XXXXXXX` (optional)
4. Save

### Add Products

1. Go to http://localhost:3000/products
2. Fill in the form:
   - Name: `Serum Glow Viral`
   - Campaign: Select your campaign
   - Description: `Serum wajah yang lagi viral...`
   - Image URL: Product image URL
   - Shopee Link: Your Shopee affiliate URL
   - TikTok Link: Your TikTok Shop affiliate URL
   - CTA Text A: `Beli di Shopee`
   - CTA Text B: `Cek Promo`
3. Click "Add Product"

### View Your Bio Link

Go to: `http://localhost:3000/skincare-viral`

You'll see your public bio link page with products!

## Project Structure

```
├── app/
│   ├── (admin)/
│   │   ├── dashboard/      # Analytics dashboard
│   │   ├── products/       # Product management
│   │   └── actions.ts      # Server actions
│   ├── [slug]/             # Public bio link pages
│   ├── login/              # Auth pages
│   └── page.tsx            # Homepage
├── components/
│   ├── ProductCard.tsx     # Smart tracking card
│   ├── ProductForm.tsx     # Product creation
│   ├── PixelScript.tsx     # Tracking pixels
│   └── Sidebar.tsx         # Admin navigation
├── lib/
│   └── supabase/           # Supabase clients
└── middleware.ts           # Route protection
```

## Key Features

### 1. Smart Product Tracking

ProductCard automatically:
- Tracks clicks to Supabase
- Fires TikTok Pixel events
- Fires Meta Pixel events
- Adds UTM parameters
- Performs A/B testing on CTA text

### 2. Analytics Dashboard

View at `/dashboard`:
- Total clicks
- Platform breakdown (Shopee vs TikTok)
- Weekly activity chart
- Active products count

### 3. Pixel Tracking

Each campaign can have:
- TikTok Pixel for TikTok Ads
- Meta Pixel for Facebook/Instagram Ads
- Google Tag Manager for custom tracking

### 4. A/B Testing

Products show random CTA variants:
- Option A: "Beli di Shopee"
- Option B: "Cek Promo"

Track which converts better in analytics!

## Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Go to https://vercel.com
3. Import your repository
4. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Deploy!

Your site will be live at: `https://your-project.vercel.app`

Share your bio links: `https://your-project.vercel.app/campaign-slug`

## Troubleshooting

### Build Errors

**Error**: Supabase URL/Key missing
- Solution: Check `.env.local` exists with correct values

**Error**: TypeScript errors
- Solution: These are handled with `@ts-ignore` comments
- The app will still build and run correctly

### Database Errors

**Error**: Table doesn't exist
- Solution: Run `supabase_schema.sql` in Supabase SQL Editor

**Error**: RLS policy errors
- Solution: Enable RLS and create policies in Supabase

### Runtime Errors

**Error**: Can't connect to Supabase
- Solution: Verify URL and anon key are correct
- Check network connection

## Tips

1. **Test Locally First**: Always test changes locally before deploying
2. **Use Real Pixels**: Add your actual TikTok/Meta pixel IDs for tracking
3. **Monitor Analytics**: Check dashboard regularly for insights
4. **A/B Test CTAs**: Try different button text to optimize conversions
5. **Use Good Images**: High-quality product images convert better

## Support Resources

- Next.js Docs: https://nextjs.org/docs
- Supabase Docs: https://supabase.com/docs
- Tailwind CSS: https://tailwindcss.com/docs
- Framer Motion: https://www.framer.com/motion

## Need Help?

1. Check this guide
2. Review the main README.md
3. Check Supabase and Next.js documentation
4. Open an issue on GitHub

---

Happy affiliate marketing! 🚀
