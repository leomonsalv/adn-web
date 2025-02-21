import { MetadataSchema } from '@/schemas/orders';
import { ReviewSchema, RatingCountsSchema, ReviewsResponseSchema } from '@/schemas/review-schema';
import { z } from 'zod';

export type Review = z.infer<typeof ReviewSchema>;
export type RatingCounts = z.infer<typeof RatingCountsSchema>;
export type Metadata = z.infer<typeof MetadataSchema>;
export type ReviewsResponse = z.infer<typeof ReviewsResponseSchema>;
