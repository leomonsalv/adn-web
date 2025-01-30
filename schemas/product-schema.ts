import * as z from 'zod';

export const NameSchema = z.enum(['Exento (ventas)', 'IVA (16%) ventas']);

export const DatumTypeSchema = z.enum(['libre']);

export const VariantMasterOptionSchema = z.enum(['color', 'size']);

export const ColorTypeSchema = z.enum(['color', 'select']);

export const SkuSchema = z.enum(['green l', 'rojo l', 'rojo xl', 'rojo xxl']);

export const MetadataEnumSchema = z.enum(['string']);

export const CategorySchema = z.object({
  editable: z.string(),
  full_name: z.string(),
  name: z.string(),
});

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

export const OptionSchema = z.object({
  images: z.null(),
  metadata: MetadataEnumSchema,
  name: VariantMasterOptionSchema,
  type: ColorTypeSchema,
  value: z.string(),
});

export const MetadataClassSchema = z.object({
  _id: z.null(),
  attack: z.array(z.string()),
  count: z.number(),
  ingredients: z.array(z.string()),
  laboratories: z.array(z.union([z.null(), z.string()])),
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

export const VariantSchema = z.object({
  images: z.array(z.string()),
  isDefault: z.boolean(),
  options: z.array(OptionSchema),
  price: z.number(),
  sku: SkuSchema,
  stock: z.number(),
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

export const ProductSchema = z.object({
  _id: z.string(),
  activeIngredients: z.union([z.null(), z.string()]),
  attack: z.union([z.null(), z.string()]),
  barcode: z.string(),
  betterAttack: z.array(z.string()),
  betterIngredients: z.array(z.string()),
  bsPrice: z.string(),
  category: CategorySchema,
  description: z.string(),
  inventary: z.record(z.string(), z.number()),
  laboratory: z.string(),
  name: z.string(),
  productId: z.number(),
  refPrice: z.number(),
  synons: z.union([z.null(), z.string()]),
  taxes: TaxesSchema,
  templateId: z.number(),
  type: ProductTypeSchema,
  updatedAt: z.coerce.date().optional(),
  variantMasterOption: VariantMasterOptionSchema.optional(),
  variantOptions: VariantOptionsSchema.optional(),
  variantOptionsMap: VariantOptionsMapSchema.optional(),
  variantTypes: z.array(VariantMasterOptionSchema).optional(),
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
