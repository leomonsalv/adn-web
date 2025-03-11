// types/special-category.ts

export interface SpecialCategory {
  category_id: string;
  created_at: string;
  description: string;
  end_date: string;
  id: string;
  image_url: string;
  is_active: boolean;
  position: number;
  start_date: string;
  title: string;
  updated_at: string;
}

export interface SpecialCategoryResponse {
  special_categories: SpecialCategory[] | null;
  total: number;
}
