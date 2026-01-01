export interface Campaign {
  id: string;
  slug: string;
  title: string;
  pixel_tiktok?: string;
  pixel_meta?: string;
  gtm_id?: string;
  created_at: string;
}

export interface Product {
  id: string;
  campaign_id: string;
  name: string;
  description?: string;
  image_url?: string;
  affiliate_url_shopee?: string;
  affiliate_url_tiktok?: string;
  cta_text_a?: string;
  cta_text_b?: string;
  is_active: boolean;
  created_at: string;
  campaigns?: { title: string }; // joined data
}

export interface ClickStats {
  click_date: string;
  total_clicks: number;
}
