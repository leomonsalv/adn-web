import { fetchProducts } from "@/api/products";
import { SearchFormType, SearchResponse } from "@/types/search";
import { useQuery } from "@tanstack/react-query";

export default function useSearchProduct() {
  const searchProduct = (params: SearchFormType) => {
    return useQuery({
      queryKey: ["search-products", ...Object.values(params)],
      queryFn: () => fetchProducts(params),
    });
  };
  return { searchProduct };
}
