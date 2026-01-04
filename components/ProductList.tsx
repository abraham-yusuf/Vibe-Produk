'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { Database } from '@/lib/types/database'
import { FiTrash2, FiExternalLink, FiToggleLeft, FiToggleRight } from 'react-icons/fi'
import Image from 'next/image'

interface Product {
  id: string
  name: string
  description: string | null
  image_url: string | null
  affiliate_url_shopee: string | null
  affiliate_url_tiktok: string | null
  is_active: boolean | null
  campaigns: {
    slug: string
    title: string
  } | null
}

interface ProductListProps {
  products: Product[]
}

export default function ProductList({ products }: ProductListProps) {
  const router = useRouter()
  const supabase = createClient()
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return

    setDeletingId(id)
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id)

      if (error) throw error
      router.refresh()
    } catch (err) {
      console.error('Delete error:', err)
      alert('Failed to delete product')
    } finally {
      setDeletingId(null)
    }
  }

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const updateData = {
        is_active: !currentStatus
      }
      
      const { error } = await supabase
        .from('products')
        // @ts-ignore - Supabase type inference issue
        .update(updateData)
        .eq('id', id)

      if (error) throw error
      router.refresh()
    } catch (err) {
      console.error('Toggle error:', err)
      alert('Failed to toggle product status')
    }
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">No products yet. Add your first product above!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="p-6 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-200"
        >
          <div className="flex gap-6">
            {/* Product Image */}
            {product.image_url && (
              <div className="flex-shrink-0">
                <div className="w-24 h-24 rounded-lg overflow-hidden bg-white/5 relative">
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            )}

            {/* Product Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{product.name}</h3>
                  {product.campaigns && (
                    <p className="text-sm text-purple-400">
                      Campaign: {product.campaigns.title}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleActive(product.id, product.is_active || false)}
                    className={`p-2 rounded-lg transition-colors ${
                      product.is_active
                        ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                        : 'bg-gray-500/20 text-gray-400 hover:bg-gray-500/30'
                    }`}
                    title={product.is_active ? 'Active' : 'Inactive'}
                  >
                    {product.is_active ? <FiToggleRight className="w-5 h-5" /> : <FiToggleLeft className="w-5 h-5" />}
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    disabled={deletingId === product.id}
                    className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors disabled:opacity-50"
                    title="Delete"
                  >
                    <FiTrash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {product.description && (
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>
              )}

              {/* Affiliate Links */}
              <div className="flex flex-wrap gap-3">
                {product.affiliate_url_shopee && (
                  <a
                    href={product.affiliate_url_shopee}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/20 text-orange-400 text-sm rounded-lg hover:bg-orange-500/30 transition-colors"
                  >
                    <span>Shopee</span>
                    <FiExternalLink className="w-4 h-4" />
                  </a>
                )}
                {product.affiliate_url_tiktok && (
                  <a
                    href={product.affiliate_url_tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-pink-500/20 text-pink-400 text-sm rounded-lg hover:bg-pink-500/30 transition-colors"
                  >
                    <span>TikTok</span>
                    <FiExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
        }
