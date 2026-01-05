'use server'

import { createServerSupabaseClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { Campaign, Product, WeeklyClick, Database } from '@/lib/types/database'

// --- Admin Actions ---

export async function getCampaigns(): Promise<Campaign[]> {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase.from('campaigns').select('*').order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching campaigns:', error)
    return []
  }
  return data as Campaign[]
}

export async function getProducts(): Promise<Product[]> {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from('products')
    .select('*, campaigns(title)')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching products:', error)
    return []
  }
  return data as Product[]
}

export async function createProduct(formData: FormData) {
  const supabase = await createServerSupabaseClient()

  const name = formData.get('name') as string
  const campaign_id = formData.get('campaign_id') as string
  const description = formData.get('description') as string | null
  const image_url = formData.get('image_url') as string | null
  const affiliate_url_shopee = formData.get('affiliate_url_shopee') as string | null
  const affiliate_url_tiktok = formData.get('affiliate_url_tiktok') as string | null

  const productData = {
    name,
    campaign_id,
    description: description || null,
    image_url: image_url || null,
    affiliate_url_shopee: affiliate_url_shopee || null,
    affiliate_url_tiktok: affiliate_url_tiktok || null,
  }

  // @ts-ignore - Supabase type inference issue
  const { error } = await supabase.from('products').insert([productData])

  if (error) {
    console.error('Error creating product:', error)
    return { success: false, error: error.message }
  }

  revalidatePath('/(admin)/products')
  return { success: true }
}

export async function deleteProduct(id: string) {
  const supabase = await createServerSupabaseClient()
  const { error } = await supabase.from('products').delete().eq('id', id)

  if (error) {
    console.error('Error deleting product:', error)
    return { success: false, error: error.message }
  }

  revalidatePath('/(admin)/products')
  return { success: true }
}

export async function getDashboardStats() {
  const supabase = await createServerSupabaseClient()

  // Fetch total clicks
  const { count: totalClicks, error: clicksError } = await supabase
    .from('clicks')
    .select('*', { count: 'exact', head: true })

  if (clicksError) console.error('Error fetching total clicks:', clicksError)

  // Fetch best performing platform
  // @ts-ignore - Supabase type inference issue
  const { data: platformData, error: platformError } = await supabase
    .from('clicks')
    .select('platform')

  if (platformError) console.error('Error fetching platform stats:', platformError)

  let bestPlatform = 'N/A'
  if (platformData) {
    const counts: Record<string, number> = {}
    platformData.forEach((p: any) => {
      if (p.platform) counts[p.platform] = (counts[p.platform] || 0) + 1
    })
    const sorted = Object.keys(counts).sort((a, b) => counts[b] - counts[a])
    if (sorted.length > 0) bestPlatform = sorted[0]
  }

  // Fetch weekly clicks via RPC
  // @ts-ignore - Supabase type inference issue
  const { data: weeklyClicks, error: weeklyError } = await supabase.rpc('get_weekly_clicks')

  if (weeklyError) console.error('Error fetching weekly clicks:', weeklyError)

  return {
    totalClicks: totalClicks || 0,
    bestPlatform,
    weeklyClicks: (weeklyClicks || []) as WeeklyClick[],
  }
}

// --- Public/Landing Page Actions ---

export async function getCampaignBySlug(slug: string): Promise<Campaign | null> {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from('campaigns')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error(`Error fetching campaign with slug ${slug}:`, error)
    return null
  }
  return data as Campaign
}

export async function getProductsByCampaign(campaignId: string): Promise<Product[]> {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('campaign_id', campaignId)
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error(`Error fetching products for campaign ${campaignId}:`, error)
    return []
  }
  return data as Product[]
}

export async function recordClick(productId: string, platform: string, userAgent: string, referrer: string) {
  const supabase = await createServerSupabaseClient()
  
  const clickData = {
    product_id: productId,
    platform,
    user_agent: userAgent,
    visitor_source: referrer,
  }
  
  // @ts-ignore - Supabase type inference issue
  const { error } = await supabase.from('clicks').insert([clickData])

  if (error) {
    console.error('Error recording click:', error)
    return { success: false }
  }
  return { success: true }
}
