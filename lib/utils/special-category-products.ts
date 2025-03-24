// lib/utils/special-category-products.ts
import { Product } from '@/types/product';

/**
 * Interfaz para los productos de la API de categorías especiales
 */
export interface ApiSpecialCategoryProduct {
  ID: string;
  Visible: boolean;
  ActiveIngredients?: string;
  Attack?: string;
  Barcode?: string;
  BsPrice?: number;
  Description?: string;
  ProductID: number;
  Images?: string[];
  Inventary?: Record<string, number>;
  Laboratory?: string;
  Name: string;
  RefPrice?: number;
  Synons?: string;
  TemplateID: number;
  Type: 'libre' | 'prescripcion' | 'tienda';
}

/**
 * Transforma un producto de la API al formato de UI
 * @param apiProduct - Producto de la API
 * @returns Producto transformado para la UI
 */
export const mapApiProductToUiProduct = (apiProduct: ApiSpecialCategoryProduct): Product => ({
  _id: apiProduct.ID,
  active: apiProduct.Visible,
  activeIngredients: apiProduct.ActiveIngredients || null,
  attack: apiProduct.Attack || null,
  barcode: apiProduct.Barcode || '',
  betterAttack: [],
  betterIngredients: [],
  bsPrice: apiProduct.BsPrice?.toString() || '0',
  category: {
    full_name: '',
    name: '',
    slug: '',
    editable: '',
    id: 0,
  },
  description: apiProduct.Description || '',
  id: apiProduct.ProductID,
  images: apiProduct.Images || [],
  inventary: apiProduct.Inventary || {},
  laboratory: apiProduct.Laboratory || '',
  quantity: 1,
  name: apiProduct.Name,
  price: apiProduct.BsPrice || 0,
  price_extra: 0,
  productId: apiProduct.ProductID,
  refPrice: apiProduct.RefPrice || 0,
  synons: apiProduct.Synons || null,
  taxes: [],
  templateId: apiProduct.TemplateID,
  type: apiProduct.Type,
  visible: apiProduct.Visible,
});

/**
 * Filtra productos por término de búsqueda
 * @param products - Lista de productos
 * @param searchTerm - Término de búsqueda
 * @returns Lista de productos filtrados
 */
export const filterProductsBySearchTerm = (products: Product[], searchTerm: string): Product[] => {
  if (!searchTerm.trim()) return products;

  const searchLower = searchTerm.trim().toLowerCase();
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchLower) ||
      (product.description && product.description.toLowerCase().includes(searchLower)) ||
      (product.activeIngredients && product.activeIngredients.toLowerCase().includes(searchLower)),
  );
};

/**
 * Tipo para las opciones de ordenamiento
 */
export type SortOption = 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc';

/**
 * Ordena productos según la opción seleccionada
 * @param products - Lista de productos
 * @param option - Opción de ordenamiento
 * @returns Lista de productos ordenados
 */
export const sortProducts = (products: Product[], option?: SortOption): Product[] => {
  if (!option) return products;

  const sortedProducts = [...products];

  const sortFunctions = {
    'price-asc': (a: Product, b: Product) => a.price - b.price,
    'price-desc': (a: Product, b: Product) => b.price - a.price,
    'name-asc': (a: Product, b: Product) => a.name.localeCompare(b.name),
    'name-desc': (a: Product, b: Product) => b.name.localeCompare(a.name),
  };

  return sortedProducts.sort(sortFunctions[option] || (() => 0));
};

/**
 * Filtra productos por atributos (laboratorio, ataque, ingredientes)
 * @param products - Lista de productos
 * @param filters - Filtros seleccionados
 * @returns Lista de productos filtrados
 */
export const filterProductsByAttributes = (
  products: Product[],
  filters: Record<string, string[]>,
): Product[] => {
  if (!filters || Object.keys(filters).length === 0) return products;

  return products.filter((product) => {
    // Verificar cada tipo de filtro
    for (const [filterType, filterValues] of Object.entries(filters)) {
      if (!filterValues || filterValues.length === 0) continue;

      // Filtrar por laboratorio
      if (filterType === 'laboratories' && product.laboratory) {
        if (!filterValues.some((value) => product.laboratory?.includes(value))) {
          return false;
        }
      }

      // Filtrar por tipo de ataque
      if (filterType === 'attack' && product.attack) {
        if (!filterValues.some((value) => product.attack?.includes(value))) {
          return false;
        }
      }

      // Filtrar por ingredientes activos
      if (filterType === 'ingredients' && product.activeIngredients) {
        if (!filterValues.some((value) => product.activeIngredients?.includes(value))) {
          return false;
        }
      }
    }

    return true;
  });
};

/**
 * Filtra productos por rango de precio
 * @param products - Lista de productos
 * @param priceRange - Rango de precio (min, max)
 * @returns Lista de productos filtrados
 */
export const filterProductsByPriceRange = (
  products: Product[],
  priceRange?: { min: number; max: number },
): Product[] => {
  if (!priceRange) return products;

  return products.filter(
    (product) => product.price >= priceRange.min && product.price <= priceRange.max,
  );
};
