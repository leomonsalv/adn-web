// types/banner.ts

export interface Banner {
  alt: string;
  created_at: string;
  description: string;
  end_date: string;
  id: string;
  image_url: string;
  is_active: boolean;
  position: number;
  start_date: string;
  target_url: string;
  title: string;
  updated_at: string;
}

export interface BannerResponse {
  banners: Banner[];
  total: number;
}
