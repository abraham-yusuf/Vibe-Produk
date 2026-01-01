import React from 'react';
import { notFound } from 'next/navigation';
import { getCampaignBySlug, getProductsByCampaign } from '@/app/(admin)/actions';
import ProductCard from '@/components/ProductCard';
import PixelScript from '@/components/PixelScript';
import GlassCard from '@/components/GlassCard';

export default async function CampaignPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // 1. Fetch Campaign
  const campaign = await getCampaignBySlug(slug);

  if (!campaign) {
    notFound();
  }

  // 2. Fetch Products
  const products = await getProductsByCampaign(campaign.id);

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden relative">
       {/* Pixels */}
       <PixelScript
         pixel_tiktok={campaign.pixel_tiktok}
         pixel_meta={campaign.pixel_meta}
       />

       {/* Hero/Header */}
       <div className="pt-12 pb-8 px-4 text-center max-w-2xl mx-auto relative z-10">
         <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 p-[2px]">
            <div className="w-full h-full rounded-full bg-[#050505] flex items-center justify-center overflow-hidden">
               {/* Placeholder Avatar */}
               <span className="text-4xl">🔥</span>
            </div>
         </div>
         <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
           {campaign.title}
         </h1>
         <p className="text-gray-400 text-lg">
            Rekomendasi produk viral termurah & terpercaya.
            Klik tombol dibawah untuk checkout! 👇
         </p>
       </div>

       {/* Product Grid */}
       <main className="max-w-md mx-auto px-4 pb-20 space-y-6 relative z-10">
         {products.length > 0 ? (
           products.map((product) => (
             <ProductCard
               key={product.id}
               product={product}
               pixel_tiktok={campaign.pixel_tiktok}
               pixel_meta={campaign.pixel_meta}
             />
           ))
         ) : (
           <GlassCard className="text-center py-12 text-gray-500">
             Belum ada produk di campaign ini.
           </GlassCard>
         )}
       </main>

       {/* Floating Footer / Branding */}
       <footer className="text-center pb-8 text-sm text-gray-600 relative z-10">
         Powered by <span className="font-bold text-purple-500">Vibe Produk ID</span>
       </footer>
    </div>
  );
}
