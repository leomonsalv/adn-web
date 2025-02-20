export interface ReviewsResponse {
  data: Review[];
  page: number;
  pageSize: number;
  totalItems: number;
  metadata: {
    averageRating: number;
    ratingCounts: {
      oneStar: number;
      twoStar: number;
      threeStar: number;
      fourStar: number;
      fiveStar: number;
    };
  };
}

export interface Review {
  id: string;
  title: string;
  comment: string;
  rating: number;
  helpful: number;
  images?: string[];
  productID: string;
  userID: string;
  verified: boolean;
  created_at: string;
  updated_at: string;
}
