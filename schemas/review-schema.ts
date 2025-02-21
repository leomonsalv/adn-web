import * as z from 'zod';

export const ReviewSchema = z.object({
  ID: z.string(),
  ProductID: z.number(),
  UserID: z.string(),
  UserName: z.string(),
  VerifiedUser: z.boolean(),
  Rating: z.number(),
  Title: z.string(),
  Comment: z.string(),
  Images: z.null(),
  Helpful: z.number(),
  NotHelpful: z.number(),
  Verified: z.boolean(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

export const RatingCountsSchema = z.object({
  oneStar: z.number(),
  twoStar: z.number(),
  threeStar: z.number(),
  fourStar: z.number(),
  fiveStar: z.number(),
});

export const MetadataSchema = z.object({
  averageRating: z.number(),
  ratingCounts: RatingCountsSchema,
});

export const ReviewsResponseSchema = z.object({
  data: z.array(ReviewSchema),
  page: z.number(),
  pageSize: z.number(),
  totalItems: z.number(),
  metadata: MetadataSchema,
});
