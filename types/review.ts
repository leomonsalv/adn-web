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
  rating: number;
  title: string;
  comment: string;
}
