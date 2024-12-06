import {
  searchFormSchema,
  SearchResponseProductSchema,
  SearchResponseSchema,
} from "@/schemas/search-form";
import { z } from "zod";

export type SearchFormType = z.infer<typeof searchFormSchema>;
export type SearchResponse = z.infer<typeof SearchResponseSchema>;
export type SearchResponseProduct = z.infer<typeof SearchResponseProductSchema>;
