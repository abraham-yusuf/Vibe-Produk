import { createServerSupabaseClient } from '@/lib/supabase/server'
import GlassCard from '@/components/ui/GlassCard'
import ProductForm from '@/components/ProductForm'
import ProductList from '@/components/ProductList'

export const dynamic = 'force-dynamic'

export default async function ProductsPage() {
  const supabase = await createServerSupabaseClient()

  // Fetch campaigns for dropdown
  const { data: campaigns } = await supabase
    .from('campaigns')
    .select('id, slug, title')
    .order('created_at', { ascending: false })

  // Fetch all products with campaign info
  const { data: products } = await supabase
    .from('products')
    .select(`
      *,
      campaigns (
        slug,
        title
      )
    `)
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Products</h1>
        <p className="text-gray-400">Manage your affiliate products and links.</p>
      </div>

      {/* Add Product Form */}
      <GlassCard className="p-6">
        <h2 className="text-xl font-bold text-white mb-6">Add New Product</h2>
        <ProductForm campaigns={campaigns || []} />
      </GlassCard>

      {/* Products List */}
      <GlassCard className="p-6">
        <h2 className="text-xl font-bold text-white mb-6">All Products</h2>
        <ProductList products={products || []} />
      </GlassCard>
    </div>
  )
}
