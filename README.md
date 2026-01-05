# Vibe Produk ID - Affiliate Bio Link Platform

A high-performance Next.js affiliate bio link platform designed for affiliate marketers (TikTok/Shopee) focused on "viral products" with advanced pixel tracking (Meta/TikTok/GTM), internal analytics, and a high-energy "Gen Z" aesthetic.

![Next.js](https://img.shields.io/badge/Next.js-15.1.3-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E)

## 🚀 Features

- **Smart Tracking**: TikTok Pixel, Meta Pixel, and Google Tag Manager integration
- **A/B Testing**: Built-in CTA text variants for conversion optimization  
- **Real-time Analytics**: Track clicks, conversions, and platform performance
- **Dynamic Bio Links**: Beautiful, customizable landing pages per campaign
- **Admin Dashboard**: Comprehensive analytics and product management
- **Glassmorphism UI**: Modern, viral-worthy design aesthetic
- **Server-Side Rendering**: Fast page loads with Next.js 15
- **TypeScript**: Full type safety throughout the application

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS + Framer Motion
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Charts**: Recharts
- **Icons**: React Icons
- **Deployment**: Vercel (recommended)

## 📋 Prerequisites

Before you begin, ensure you have:

- Node.js 18+ installed
- npm or yarn package manager
- A Supabase account and project ([Create one here](https://supabase.com))

## 🏁 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/abraham-yusuf/Vibe-Produk.git
cd Vibe-Produk
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

1. Create a new project in [Supabase Dashboard](https://app.supabase.com)
2. Run the SQL schema from `supabase_schema.sql` in the SQL Editor
3. Get your project URL and anon key from Settings > API

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Replace the placeholder values with your actual Supabase credentials.

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your application.

## 📁 Project Structure

```
├── app/
│   ├── (admin)/          # Protected admin routes
│   │   ├── dashboard/    # Analytics dashboard
│   │   ├── products/     # Product management
│   │   ├── actions.ts    # Server actions
│   │   └── layout.tsx    # Admin layout
│   ├── [slug]/           # Dynamic campaign pages
│   ├── login/            # Authentication pages
│   ├── signup/
│   └── page.tsx          # Landing page
├── components/
│   ├── ui/               # Reusable UI components
│   ├── ProductCard.tsx   # Smart product card with tracking
│   ├── ProductForm.tsx   # Product creation form
│   ├── PixelScript.tsx   # Pixel tracking scripts
│   └── ...
├── lib/
│   ├── supabase/         # Supabase client utilities
│   │   ├── client.ts     # Browser client
│   │   ├── server.ts     # Server client
│   │   └── middleware.ts # Auth middleware
│   └── types/
│       └── database.ts   # Database types
├── middleware.ts         # Route protection
└── supabase_schema.sql   # Database schema
```

## 🎨 Key Components

### ProductCard
Smart product card with:
- Automatic click tracking
- A/B testing for CTA buttons
- Pixel event firing (TikTok, Meta, GTM)
- UTM parameter injection
- Glassmorphism design

### PixelScript
Handles injection of:
- TikTok Pixel
- Meta (Facebook) Pixel
- Google Tag Manager

### Dashboard
Real-time analytics showing:
- Total clicks
- Platform performance (Shopee vs TikTok)
- Weekly activity charts
- Active products count

## 🗄️ Database Schema

The application uses 3 main tables:

1. **campaigns**: Campaign/niche landing pages
2. **products**: Affiliate products with links
3. **clicks**: Analytics tracking data

Plus 1 RPC function:
- **get_weekly_clicks()**: Returns 7-day click statistics

See `supabase_schema.sql` for the complete schema.

## 🔐 Authentication

The app uses Supabase Auth with:
- Email/password authentication
- Protected admin routes via middleware
- Automatic session management

Admin pages (`/dashboard`, `/products`) are protected and require authentication.

## 📊 Analytics

Built-in tracking for:
- Click-through rates
- Platform performance (Shopee/TikTok)
- Campaign effectiveness
- Weekly trends

All data is stored in Supabase and visualized with Recharts.

## 🎯 Pixel Tracking

Each campaign supports:
- **TikTok Pixel**: Track TikTok ad conversions
- **Meta Pixel**: Track Facebook/Instagram ad conversions
- **Google Tag Manager**: Custom event tracking

Pixels are injected per-campaign and fire events on:
- Page views
- Button clicks
- Product interactions

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/abraham-yusuf/Vibe-Produk)

### Environment Variables on Vercel

Add these in your Vercel project settings:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 🧪 Development

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

### Type Check

The project uses TypeScript with strict mode. Some Supabase type inference limitations are handled with `@ts-ignore` comments for database operations.

## 🔒 Security Notes

- Never commit `.env.local` to version control
- Keep Supabase anon key secure (it's safe for client-side use)
- Enable Row Level Security (RLS) in Supabase for production
- Use HTTPS in production

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 💡 Tips for Use

1. **Create a Campaign**: Set up your first campaign with a unique slug
2. **Add Products**: Add affiliate products with Shopee/TikTok links
3. **Configure Pixels**: Add your TikTok/Meta pixel IDs to the campaign
4. **Share Your Link**: Share `yoursite.com/[campaign-slug]` 
5. **Track Performance**: Monitor clicks and conversions in the dashboard

## 📧 Support

For issues or questions:
- Open an issue on GitHub
- Check existing documentation
- Review Supabase and Next.js docs

---

Built with ❤️ using Next.js, Supabase, and Tailwind CSS
