'use client';

import React, { useRef } from 'react';
import { createProduct } from '@/app/(admin)/actions';
import ViralButton from '@/components/ViralButton';
import GlassCard from '@/components/GlassCard';
import { Campaign } from '@/types';

export default function ProductForm({ campaigns }: { campaigns: Campaign[] }) {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (formData: FormData) => {
    await createProduct(formData);
    formRef.current?.reset();
  };

  return (
    <GlassCard className="mb-8">
      <h2 className="text-xl font-bold mb-6 text-white">Add New Product</h2>
      <form ref={formRef} action={handleSubmit} className="grid gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="name"
            placeholder="Product Name"
            required
            className="bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500"
          />
          <select
            name="campaign_id"
            required
            className="bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500"
            defaultValue=""
          >
            <option value="" disabled className="text-black">Select Campaign</option>
            {campaigns.map((c) => (
              <option key={c.id} value={c.id} className="text-black">
                {c.title}
              </option>
            ))}
          </select>
        </div>

        <textarea
          name="description"
          placeholder="Short Description"
          className="bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500 h-24"
        />

        <input
          name="image_url"
          placeholder="Image URL"
          className="bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="affiliate_url_shopee"
            placeholder="Shopee Affiliate URL"
            className="bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500"
          />
          <input
            name="affiliate_url_tiktok"
            placeholder="TikTok Affiliate URL"
            className="bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500"
          />
        </div>

        <div className="flex justify-end mt-4">
          <ViralButton type="submit">
            Add Product
          </ViralButton>
        </div>
      </form>
    </GlassCard>
  );
}
