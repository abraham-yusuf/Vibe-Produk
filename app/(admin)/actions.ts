'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { Campaign, Product, ClickStats } from '@/types'

export async function getCampaigns(): Promise<Campaign[]> {
  const supabase = await createClient()
  const { data, error } = await supabase.from('campaigns').select('*').order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching campaigns:', error)
    return []
  }
  return data as Campaign[]
}

export async function getProducts(): Promise<Product[]> {
  const supabase = await createClient()
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
  const supabase = await createClient()

  const name = formData.get('name') as string
  const campaign_id = formData.get('campaign_id') as string
  const description = formData.get('description') as string
  const image_url = formData.get('image_url') as string
  const affiliate_url_shopee = formData.get('affiliate_url_shopee') as string
  const affiliate_url_tiktok = formData.get('affiliate_url_tiktok') as string

  const { error } = await supabase.from('products').insert({
    name,
    campaign_id,
    description,
    image_url,
    affiliate_url_shopee,
    affiliate_url_tiktok,
  })

  if (error) {
    console.error('Error creating product:', error)
    return { success: false, error: error.message }
  }

  revalidatePath('/(admin)/products')
  return { success: true }
}

export async function deleteProduct(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('products').delete().eq('id', id)

  if (error) {
    console.error('Error deleting product:', error)
    return { success: false, error: error.message }
  }

  revalidatePath('/(admin)/products')
  return { success: true }
}

export async function getDashboardStats() {
  const supabase = await createClient()

  // Fetch total clicks
  const { count: totalClicks, error: clicksError } = await supabase
    .from('clicks')
    .select('*', { count: 'exact', head: true })

  if (clicksError) console.error('Error fetching total clicks:', clicksError)

  // Fetch best performing platform
  const { data: platformData, error: platformError } = await supabase
    .from('clicks')
    .select('platform')

  if (platformError) console.error('Error fetching platform stats:', platformError)

  let bestPlatform = 'N/A'
  if (platformData) {
    const counts: Record<string, number> = {}
    platformData.forEach((p) => {
      if (p.platform) counts[p.platform] = (counts[p.platform] || 0) + 1
    })
    const sorted = Object.keys(counts).sort((a, b) => counts[b] - counts[a])
    if (sorted.length > 0) bestPlatform = sorted[0]
  }

  // Fetch weekly clicks via RPC
  const { data: weeklyClicks, error: weeklyError } = await supabase.rpc('get_weekly_clicks')

  if (weeklyError) console.error('Error fetching weekly clicks:', weeklyError)

  return {
    totalClicks: totalClicks || 0,
    bestPlatform,
    weeklyClicks: (weeklyClicks || []) as ClickStats[],
  }
}
