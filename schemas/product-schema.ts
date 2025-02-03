import * as z from 'zod';
import { CurrencySchema, FacetsSchema } from './categories-schema';
import { LaboratorySchema } from './orders';

export const NameSchema = z.enum(['Exento (ventas)', 'IVA (16%) ventas']);

export const DatumTypeSchema = z.enum(['libre']);

export const VariantMasterOptionSchema = z.enum(['color', 'size']);

export const ColorTypeSchema = z.enum(['color', 'select']);

export const SkuSchema = z.enum(['green l', 'rojo l', 'rojo xl', 'rojo xxl']);

export const MetadataEnumSchema = z.enum(['string']);

export const TaxesSchema = z.object({
  amount: z.string(),
  name: NameSchema,
});

export const ColorSchema = z.object({
  type: ColorTypeSchema,
  values: z.array(z.string()),
});

export const GreenClassSchema = z.object({
  SKU: SkuSchema,
  price: z.number(),
  stock: z.number(),
});

export const LOptionsSchema = z.object({
  green: GreenClassSchema,
  red: GreenClassSchema,
});

export const RedOptionsSchema = z.object({
  l: GreenClassSchema,
  xl: GreenClassSchema,
  xxl: GreenClassSchema,
});

export const XlOptionsSchema = z.object({
  red: GreenClassSchema,
});

export const MetadataClassSchema = z.object({
  _id: z.null(),
  attack: z.array(z.string()),
  activeIngredients: z.array(z.string()),
  count: z.number(),
  ingredients: z.array(z.string()),
  laboratories: z.array(z.union([z.null(), z.string()])),
  laboratory: z.array(z.string()),
});

export const VariantOptionsSchema = z.object({
  color: ColorSchema,
  size: ColorSchema,
});

export const GreenOptionsSchema = z.object({
  l: GreenClassSchema,
});

export const VariantOptionsMapLSchema = z.object({
  images: z.array(z.string()),
  options: LOptionsSchema,
});

export const RedSchema = z.object({
  images: z.array(z.string()),
  options: RedOptionsSchema,
});

export const XlSchema = z.object({
  images: z.array(z.string()),
  options: XlOptionsSchema,
});

export const GreenSchema = z.object({
  images: z.array(z.string()),
  options: GreenOptionsSchema,
});

export const VariantOptionsMapSchema = z.object({
  green: GreenSchema,
  l: VariantOptionsMapLSchema,
  red: RedSchema,
  xl: XlSchema,
  xxl: XlSchema,
});

export const ProductTypeSchema = z.enum(['libre']);

const OptionSchema = z.object({
  images: z.null(),
  metadata: z.string(),
  name: z.enum(['color', 'size']),
  type: z.enum(['color', 'select']),
  value: z.string(),
});

const VariantOptionsMapItemSchema = z.object({
  SKU: z.string(),
  price: z.number(),
  stock: z.number(),
});

const VariantSchema = z.object({
  images: z.array(z.string()),
  isDefault: z.boolean(),
  options: z.array(OptionSchema),
  price: z.number(),
  sku: z.string(),
  stock: z.number(),
});

const CategorySchema = z.object({
  editable: z.string(),
  full_name: z.string(),
  name: z.string(),
});

const TaxSchema = z.object({
  amount: z.string(),
  name: z.string(),
});

export const ProductSchema = z.object({
  _id: z.string(),
  activeIngredients: z.string().nullable(),
  attack: z.string().nullable(),
  barcode: z.string(),
  betterAttack: z.array(z.string()),
  betterIngredients: z.array(z.string()),
  bsPrice: z.string(),
  category: CategorySchema,
  description: z.string(),
  id: z.number(),
  images: z.array(z.string()).optional(),
  inventary: z.record(z.string(), z.number()),
  laboratory: z.string(),
  name: z.string(),
  price: z.number(),
  price_extra: z.number(),
  productId: z.number(),
  refPrice: z.number(),
  synons: z.string().nullable(),
  taxes: TaxSchema,
  templateId: z.number(),
  type: z.enum(['libre', 'prescripcion', 'tienda']),
  updatedAt: z.coerce.date().optional(),
  variantMasterOption: z.enum(['color', 'size']).optional(),
  variantOptions: z
    .object({
      color: z.object({
        type: z.enum(['color']),
        values: z.array(z.string()),
      }),
      size: z.object({
        type: z.enum(['select']),
        values: z.array(z.string()),
      }),
    })
    .optional(),
  variantOptionsMap: z
    .record(
      z.string(),
      z.object({
        images: z.array(z.string()),
        options: z.record(z.string(), VariantOptionsMapItemSchema),
      }),
    )
    .optional(),
  variantTypes: z.array(z.enum(['color', 'size'])).optional(),
  variants: z.array(VariantSchema).optional(),
  visible: z.boolean(),
});

export const ProductResponseSchema = z.object({
  data: z.array(ProductSchema),
  page: z.number(),
  pageSize: z.number(),
  totalItems: z.number(),
  metadata: MetadataClassSchema,
});

// THIS IS THE OLD PAYLOAD TO RECOMMENDED PRODUCTS AND TOP SELLING PRODUCTS

export const PageSizeSchema = z.object({
  current: z.number(),
  size: z.number(),
});

export const TopSellingProductsPayloadSchema = z.object({
  active: z.boolean(),
  offers: z.boolean().optional(),
  pageSize: PageSizeSchema.optional(),
  actualPage: z.number().optional(),
  priceRange: z.array(z.number()),
  facets: FacetsSchema.optional(),
});

export const RecommendedProductsPayloadSchema = z.object({
  type: z.string(),
  products: z.array(z.union([z.number(), z.string()])).optional(),
  todos: z.boolean().optional(),
  productBased: z.boolean().optional(),
});

export const RecommendedProductsResponseElementSchema = z.object({
  id: z.number(),
  barcode: z.string(),
  name: z.string(),
  price: z.number(),
  price_extra: z.number(),
  description: z.string(),
  imageLarge: z.string(),
  image: z.string(),
  imageSmall: z.string(),
  imageXtraSmall: z.string(),
  imageUltraSmall: z.string(),
  qty_available: z.number(),
  currency: CurrencySchema,
  taxes_ids: z.array(z.string()),
  required_recipe: z.boolean(),
  laboratory: LaboratorySchema,
  product_type: ProductTypeSchema,
  recommended: z.string(),
  offers: z.string(),
  x_studio_previous_price: z.number(),
  price_ref: z.number(),
  categ_route: z.string(),
  saleslast7days: z.number(),
  discount_rate: z.number(),
  move_location_id: z.string(),
  moves_location_id: z.string(),
  x_studio_libre_de_gluten: z.string(),
  x_studio_2x1: z.string(),
  x_studio_fecha_de_vencimiento: z.string(),
  taxes: z.array(TaxSchema),
});
