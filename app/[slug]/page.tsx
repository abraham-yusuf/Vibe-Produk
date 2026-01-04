import { createServerSupabaseClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import PixelScript from '@/components/PixelScript'
import ProductCard from '@/components/ProductCard'
import { FiInstagram, FiTwitter, FiYoutube } from 'react-icons/fi'

interface PageProps {
  params: Promise<{ slug: string }>
}

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const supabase = await createServerSupabaseClient()
  
  const { data: campaign } = await supabase
    .from('campaigns')
    .select('title')
    .eq('slug', slug)
    .single()

  return {
    title: campaign ? `${campaign.title} | Vibe Produk ID` : 'Vibe Produk ID',
    description: 'Produk viral pilihan terbaik dengan harga spesial',
  }
}

export default async function PublicLandingPage({ params }: PageProps) {
  const { slug } = await params
  const supabase = await createServerSupabaseClient()

  // Fetch campaign by slug
  const { data: campaign, error } = await supabase
    .from('campaigns')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !campaign) {
    notFound()
  }

  // Fetch active products for this campaign
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('campaign_id', campaign.id)
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  return (
    <>
      {/* Inject Tracking Pixels */}
      <PixelScript
        tiktokPixel={campaign.pixel_tiktok}
        metaPixel={campaign.pixel_meta}
        gtmId={campaign.gtm_id}
      />

      <div className="min-h-screen bg-vibe-dark relative overflow-hidden">
        {/* Animated Background Blobs */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl animate-float" />
          <div className="absolute top-1/4 -right-20 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-2xl mx-auto px-4 py-12">
          {/* Header Section */}
          <header className="text-center mb-12 animate-fade-in">
            {/* Avatar */}
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-vibe p-1 shadow-2xl shadow-purple-500/20">
              <div className="w-full h-full rounded-full bg-vibe-darker flex items-center justify-center text-4xl font-bold text-white">
                🔥
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-vibe bg-clip-text text-transparent animate-pulse-slow">
              {campaign.title}
            </h1>

            {/* Description */}
            <p className="text-gray-400 text-lg mb-6 max-w-md mx-auto">
              Produk viral pilihan terbaik dengan harga spesial. Buruan cek sebelum kehabisan! 🛍️
            </p>

            {/* Social Links */}
            <div className="flex justify-center gap-4 mb-8">
              <a
                href="#"
                className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-purple-500 hover:bg-purple-500/10 transition-all duration-200"
              >
                <FiInstagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-blue-500 hover:bg-blue-500/10 transition-all duration-200"
              >
                <FiTwitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-red-500 hover:bg-red-500/10 transition-all duration-200"
              >
                <FiYoutube className="w-5 h-5" />
              </a>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </header>

          {/* Products Grid */}
          <main className="space-y-6">
            {products && products.length > 0 ? (
              products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  campaignSlug={campaign.slug}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">Belum ada produk tersedia saat ini.</p>
              </div>
            )}
          </main>

          {/* Footer */}
          <footer className="mt-16 text-center pb-8">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full">
              <span className="text-sm text-gray-400">Powered by</span>
              <span className="text-sm font-bold bg-gradient-vibe bg-clip-text text-transparent">
                Vibe Produk ID
              </span>
            </div>
          </footer>
        </div>
      </div>
    </>
  )
}
