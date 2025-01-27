// types/search.ts
import {
  searchFormSchema,
  SearchResponseSchema,
  SearchResponseProductSchema,
  SearchSuggestionsResponseSchema,
  PaginationSchema,
  FacetSchema,
  PriceRangeSchema,
} from '@/schemas/search-form';
import { z } from 'zod';

export type SearchFormType = z.infer<typeof searchFormSchema>;
export type SearchResponse = z.infer<typeof SearchResponseSchema>;
export type SearchResponseProduct = z.infer<typeof SearchResponseProductSchema>;
export type SearchSuggestionsResponse = z.infer<typeof SearchSuggestionsResponseSchema>;
export type Pagination = z.infer<typeof PaginationSchema>;
export type Facet = z.infer<typeof FacetSchema>;
export type PriceRange = z.infer<typeof PriceRangeSchema>;
