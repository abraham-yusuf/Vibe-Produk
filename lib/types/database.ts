export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      campaigns: {
        Row: {
          id: string
          user_id: string | null
          slug: string
          title: string
          pixel_tiktok: string | null
          pixel_meta: string | null
          gtm_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          slug: string
          title: string
          pixel_tiktok?: string | null
          pixel_meta?: string | null
          gtm_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          slug?: string
          title?: string
          pixel_tiktok?: string | null
          pixel_meta?: string | null
          gtm_id?: string | null
          created_at?: string
        }
      }
      products: {
        Row: {
          id: string
          campaign_id: string
          name: string
          description: string | null
          image_url: string | null
          affiliate_url_shopee: string | null
          affiliate_url_tiktok: string | null
          cta_text_a: string | null
          cta_text_b: string | null
          is_active: boolean | null
          created_at: string
        }
        Insert: {
          id?: string
          campaign_id: string
          name: string
          description?: string | null
          image_url?: string | null
          affiliate_url_shopee?: string | null
          affiliate_url_tiktok?: string | null
          cta_text_a?: string | null
          cta_text_b?: string | null
          is_active?: boolean | null
          created_at?: string
        }
        Update: {
          id?: string
          campaign_id?: string
          name?: string
          description?: string | null
          image_url?: string | null
          affiliate_url_shopee?: string | null
          affiliate_url_tiktok?: string | null
          cta_text_a?: string | null
          cta_text_b?: string | null
          is_active?: boolean | null
          created_at?: string
        }
      }
      clicks: {
        Row: {
          id: string
          product_id: string
          platform: string | null
          visitor_source: string | null
          user_agent: string | null
          created_at: string
        }
        Insert: {
          id?: string
          product_id: string
          platform?: string | null
          visitor_source?: string | null
          user_agent?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          product_id?: string
          platform?: string | null
          visitor_source?: string | null
          user_agent?: string | null
          created_at?: string
        }
      }
    }
    Functions: {
      get_weekly_clicks: {
        Args: Record<string, never>
        Returns: {
          click_date: string
          total_clicks: number
        }[]
      }
    }
  }
}

export type Campaign = Database['public']['Tables']['campaigns']['Row']
export type Product = Database['public']['Tables']['products']['Row']
export type Click = Database['public']['Tables']['clicks']['Row']
export type WeeklyClick = Database['public']['Functions']['get_weekly_clicks']['Returns'][0]
