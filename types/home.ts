import { NameSchema, TypeSchema, TaxSchema } from '@/schemas/categories-schema';
import {
  CategorySchema,
  BienestarSchema,
  BotiquinSchema,
  ComestibleSchema,
  MedicamentoSchema,
  InventarySchema,
  BellezaSchema,
  RepuestoSchema,
  GetTopSellingProductsResponseSchema,
} from '@/schemas/top-selling-schema';
import { z } from 'zod';

export type Name = z.infer<typeof NameSchema>;
export type Type = z.infer<typeof TypeSchema>;
export type Category = z.infer<typeof CategorySchema>;
export type Tax = z.infer<typeof TaxSchema>;
export type Bienestar = z.infer<typeof BienestarSchema>;
export type Botiquin = z.infer<typeof BotiquinSchema>;
export type Comestible = z.infer<typeof ComestibleSchema>;
export type Medicamento = z.infer<typeof MedicamentoSchema>;
export type Inventary = z.infer<typeof InventarySchema>;
export type Belleza = z.infer<typeof BellezaSchema>;
export type Repuesto = z.infer<typeof RepuestoSchema>;
export type GetTopSellingProductsResponse = z.infer<typeof GetTopSellingProductsResponseSchema>;
