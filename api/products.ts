import { functions } from "@/lib/firebaseConfig";
import { httpsCallable } from "firebase/functions";
import { SearchFormType, SearchResponse } from "@/types/search";

export const fetchProducts = async (
  params: SearchFormType,
): Promise<SearchResponse> => {
  const response = await httpsCallable<SearchFormType, SearchResponse>(
    functions,
    "es-search",
  )(params);
  return response.data;
};
