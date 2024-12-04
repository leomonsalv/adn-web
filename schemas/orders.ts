import * as z from "zod";

export const CurrencySchema = z.enum(["VEF", "USD"]);
export type Currency = z.infer<typeof CurrencySchema>;

export const LaboratorySchema = z.string();
export type Laboratory = z.infer<typeof LaboratorySchema>;

export const ProductTypeSchema = z.string();
export type ProductType = z.infer<typeof ProductTypeSchema>;

export const AmountTypeSchema = z.enum(["percent"]);
export type AmountType = z.infer<typeof AmountTypeSchema>;

export const NameSchema = z.string();
export type Name = z.infer<typeof NameSchema>;

export const DescriptionEnumSchema = z.string();
export type DescriptionEnum = z.infer<typeof DescriptionEnumSchema>;

export const StateSchema = z.string();
export type State = z.infer<typeof StateSchema>;

export const XStudioFechaDeVencimientoSchema = z.enum(["N/A"]);
export type XStudioFechaDeVencimiento = z.infer<
  typeof XStudioFechaDeVencimientoSchema
>;

export const TimestampClassSchema = z.object({
  seconds: z.number(),
  nanoseconds: z.number(),
});
export type TimestampClass = z.infer<typeof TimestampClassSchema>;

export const AddressIdSchema = z.object({
  stringValue: z.string(),
});
export type AddressId = z.infer<typeof AddressIdSchema>;

export const CodeSchema = z.object({
  integerValue: z.string(),
});
export type Code = z.infer<typeof CodeSchema>;

export const InvoicePrintedSchema = z.object({
  booleanValue: z.boolean(),
});
export type InvoicePrinted = z.infer<typeof InvoicePrintedSchema>;

export const DeletedAtSchema = z.object({
  nullValue: z.null(),
});
export type DeletedAt = z.infer<typeof DeletedAtSchema>;

export const RateSchema = z.object({
  doubleValue: z.number(),
});
export type Rate = z.infer<typeof RateSchema>;

export const IndigoFieldsSchema = z.object({
  dni: AddressIdSchema,
  fullName: AddressIdSchema,
  fullname: AddressIdSchema,
  saveData: InvoicePrintedSchema,
  name: AddressIdSchema,
  prefix: AddressIdSchema,
  phone: AddressIdSchema,
  dniType: AddressIdSchema,
  email: AddressIdSchema,
});
export type IndigoFields = z.infer<typeof IndigoFieldsSchema>;

export const FieldsDateSchema = z.object({
  timestampValue: z.coerce.date(),
});
export type FieldsDate = z.infer<typeof FieldsDateSchema>;

export const IndecentFieldsSchema = z.object({
  code: AddressIdSchema,
  totalBs: AddressIdSchema,
});
export type IndecentFields = z.infer<typeof IndecentFieldsSchema>;

export const FluffyFieldsSchema = z.object({
  tasa: RateSchema,
  product_uom_qty: CodeSchema,
  tax: CodeSchema,
  product_id: CodeSchema,
  subtotal: RateSchema,
  total: RateSchema,
});
export type FluffyFields = z.infer<typeof FluffyFieldsSchema>;

export const DescriptionClassSchema = z.object({
  stringValue: z.string().optional(),
  nullValue: z.null().optional(),
});
export type DescriptionClass = z.infer<typeof DescriptionClassSchema>;

export const RecommendedClassSchema = z.object({
  booleanValue: z.boolean().optional(),
  stringValue: z.string().optional(),
});
export type RecommendedClass = z.infer<typeof RecommendedClassSchema>;

export const Saleslast7DaysClassSchema = z.object({
  stringValue: z.string().optional(),
  integerValue: z.string().optional(),
});
export type Saleslast7DaysClass = z.infer<typeof Saleslast7DaysClassSchema>;

export const MagentaFieldsSchema = z.object({
  name: AddressIdSchema,
  id: CodeSchema,
});
export type MagentaFields = z.infer<typeof MagentaFieldsSchema>;

export const TaxesIdsArrayValueSchema = z.object({
  values: z.array(AddressIdSchema),
});
export type TaxesIdsArrayValue = z.infer<typeof TaxesIdsArrayValueSchema>;

export const MischievousFieldsSchema = z.object({
  image: AddressIdSchema,
  amount: RateSchema,
});
export type MischievousFields = z.infer<typeof MischievousFieldsSchema>;

export const Fields1Schema = z.object({
  amount: RateSchema,
});
export type Fields1 = z.infer<typeof Fields1Schema>;

export const Fields3Schema = z.object({
  type: AddressIdSchema,
});
export type Fields3 = z.infer<typeof Fields3Schema>;

export const Fields4Schema = z.object({
  text: AddressIdSchema,
  type: AddressIdSchema,
});
export type Fields4 = z.infer<typeof Fields4Schema>;

export const Fields5Schema = z.object({
  id: AddressIdSchema,
  message: AddressIdSchema,
  label: AddressIdSchema,
  isDone: InvoicePrintedSchema,
  date: FieldsDateSchema,
});
export type Fields5 = z.infer<typeof Fields5Schema>;

export const PathSchema = z.object({
  segments: z.array(z.string()),
  offset: z.number(),
  len: z.number(),
});
export type Path = z.infer<typeof PathSchema>;

export const ConfigSchema = z.object({
  name: z.string(),
  automaticDataCollectionEnabled: z.boolean(),
});
export type Config = z.infer<typeof ConfigSchema>;

export const ExperimentalLongPollingOptionsSchema = z.object({});
export type ExperimentalLongPollingOptions = z.infer<
  typeof ExperimentalLongPollingOptionsSchema
>;

export const OptionsSchema = z.object({
  apiKey: z.string(),
  authDomain: z.string(),
  projectId: z.string(),
  storageBucket: z.string(),
  messagingSenderId: z.string(),
  appId: z.string(),
});
export type Options = z.infer<typeof OptionsSchema>;

export const DatabaseIdSchema = z.object({
  projectId: z.string(),
  database: z.string(),
});
export type DatabaseId = z.infer<typeof DatabaseIdSchema>;

export const SettingsSchema = z.object({
  host: z.string(),
  ssl: z.boolean(),
  ignoreUndefinedProperties: z.boolean(),
  cacheSizeBytes: z.number(),
  experimentalForceLongPolling: z.boolean(),
  experimentalAutoDetectLongPolling: z.boolean(),
  experimentalLongPollingOptions: ExperimentalLongPollingOptionsSchema,
  useFetchStreams: z.boolean(),
});
export type Settings = z.infer<typeof SettingsSchema>;

export const MetadataSchema = z.object({
  hasPendingWrites: z.boolean(),
  fromCache: z.boolean(),
});
export type Metadata = z.infer<typeof MetadataSchema>;

export const AddressDetailsPositionSchema = z.object({
  lat: z.number(),
  lng: z.number(),
});
export type AddressDetailsPosition = z.infer<
  typeof AddressDetailsPositionSchema
>;

export const OrderCustomizedInvoiceSchema = z.object({
  email: z.string(),
  name: z.string(),
  phone: z.string(),
  fullname: z.string(),
  saveData: z.union([z.boolean(), z.null()]),
  prefix: z.string(),
  dni: z.string(),
  dniType: z.string(),
  fullName: z.string().optional(),
});
export type OrderCustomizedInvoice = z.infer<
  typeof OrderCustomizedInvoiceSchema
>;

export const OrderDiscountSchema = z.object({
  code: z.string(),
  totalBs: z.string(),
});
export type OrderDiscount = z.infer<typeof OrderDiscountSchema>;

export const FEproductSchema = z.object({
  product_uom_qty: z.number(),
  subtotal: z.number(),
  product_id: z.number(),
  tax: z.number(),
  total: z.number().optional(),
  tasa: z.number().optional(),
});
export type FEproduct = z.infer<typeof FEproductSchema>;

export const TaxCompanySchema = z.object({
  id: z.number(),
  name: NameSchema,
});
export type TaxCompany = z.infer<typeof TaxCompanySchema>;

export const AmigaDetailsSchema = z.object({
  id: z.string(),
  Status: z.string(),
  Amount: z.string(),
});
export type AmigaDetails = z.infer<typeof AmigaDetailsSchema>;

export const CashbackSchema = z.object({
  telefono: z.string(),
  banco: z.string(),
  cedula: z.string(),
});
export type Cashback = z.infer<typeof CashbackSchema>;

export const PaymentDetailsSchema = z.object({
  image: z.string(),
  amount: z.number(),
});
export type PaymentDetails = z.infer<typeof PaymentDetailsSchema>;

export const BillSchema = z.object({
  code: z.string(),
  amount: z.string(),
});
export type Bill = z.infer<typeof BillSchema>;

export const ProductListElementSchema = z.object({
  subtotal: z.number(),
  tax: z.number(),
  product_id: z.number(),
  product_uom_qty: z.number(),
});
export type ProductListElement = z.infer<typeof ProductListElementSchema>;

export const PaymentMethodDetailsSchema = z.object({
  bills: z.array(BillSchema).optional(),
  amount: z.string(),
  phone: z.string().optional(),
  dniType: z.string().optional(),
  dni: z.string().optional(),
  bank: z.string().optional(),
  destination: z.string().optional(),
  prefix: z.string().optional(),
});
export type PaymentMethodDetails = z.infer<typeof PaymentMethodDetailsSchema>;

export const ShippingDetailsSchema = z.object({
  schedule: z.null().optional(),
  type: z.string(),
});
export type ShippingDetails = z.infer<typeof ShippingDetailsSchema>;

export const FbBodyStatusSchema = z.object({
  type: z.string(),
  text: z.string(),
});
export type FbBodyStatus = z.infer<typeof FbBodyStatusSchema>;

export const StepSchema = z.object({
  date: TimestampClassSchema,
  isDone: z.boolean(),
  id: z.string(),
  label: z.string(),
  message: z.string(),
});
export type Step = z.infer<typeof StepSchema>;

export const IgtfControlSchema = z.object({
  tax: z.number(),
  enabled: z.boolean(),
});
export type IgtfControl = z.infer<typeof IgtfControlSchema>;

export const OdooOrderSchema = z.object({
  state: StateSchema,
  location_id: z.number(),
  product_list: z.array(ProductListElementSchema),
  pricelist_id: z.number(),
  company_id: z.number(),
  partner_id: z.number(),
});
export type OdooOrder = z.infer<typeof OdooOrderSchema>;

export const CreateTimeSchema = z.object({
  timestamp: TimestampClassSchema,
});
export type CreateTime = z.infer<typeof CreateTimeSchema>;

export const StickyFieldsSchema = z.object({
  lng: RateSchema,
  lat: RateSchema,
});
export type StickyFields = z.infer<typeof StickyFieldsSchema>;

export const CustomizedInvoiceMapValueSchema = z.object({
  fields: IndigoFieldsSchema,
});
export type CustomizedInvoiceMapValue = z.infer<
  typeof CustomizedInvoiceMapValueSchema
>;

export const DiscountMapValueSchema = z.object({
  fields: IndecentFieldsSchema,
});
export type DiscountMapValue = z.infer<typeof DiscountMapValueSchema>;

export const FluffyMapValueSchema = z.object({
  fields: FluffyFieldsSchema,
});
export type FluffyMapValue = z.infer<typeof FluffyMapValueSchema>;

export const CompanyMapValueSchema = z.object({
  fields: MagentaFieldsSchema,
});
export type CompanyMapValue = z.infer<typeof CompanyMapValueSchema>;

export const TaxesIdsSchema = z.object({
  arrayValue: TaxesIdsArrayValueSchema,
});
export type TaxesIds = z.infer<typeof TaxesIdsSchema>;

export const IndigoMapValueSchema = z.object({
  fields: MischievousFieldsSchema,
});
export type IndigoMapValue = z.infer<typeof IndigoMapValueSchema>;

export const HilariousMapValueSchema = z.object({
  fields: Fields1Schema,
});
export type HilariousMapValue = z.infer<typeof HilariousMapValueSchema>;

export const AmbitiousMapValueSchema = z.object({
  fields: Fields3Schema,
});
export type AmbitiousMapValue = z.infer<typeof AmbitiousMapValueSchema>;

export const StatusMapValueSchema = z.object({
  fields: Fields4Schema,
});
export type StatusMapValue = z.infer<typeof StatusMapValueSchema>;

export const CunningMapValueSchema = z.object({
  fields: Fields5Schema,
});
export type CunningMapValue = z.infer<typeof CunningMapValueSchema>;

export const KeySchema = z.object({
  path: PathSchema,
});
export type Key = z.infer<typeof KeySchema>;

export const ContainerSchema = z.object({
  name: z.string(),
  providers: ExperimentalLongPollingOptionsSchema,
});
export type Container = z.infer<typeof ContainerSchema>;

export const OrderAddressDetailsSchema = z.object({
  prettyAddress: z.string(),
  city: z.string(),
  position: AddressDetailsPositionSchema,
  phone: z.string(),
  zone: z.null(),
  street: z.string(),
  type: z.string(),
  id: z.string(),
  routeId: z.string(),
  alias: z.string(),
  addressId: z.string(),
  state: z.null(),
  deletedAt: z.null(),
  creationDate: z.number(),
  instructions: z.string(),
  default: z.boolean(),
  house: z.string(),
});
export type OrderAddressDetails = z.infer<typeof OrderAddressDetailsSchema>;

export const TaxSchema = z.object({
  company: TaxCompanySchema,
  price_include: z.boolean(),
  name: DescriptionEnumSchema,
  id: z.number(),
  type: StateSchema,
  description: DescriptionEnumSchema,
  amount_type: AmountTypeSchema,
  amount: z.number(),
});
export type Tax = z.infer<typeof TaxSchema>;

export const StickyDetailsSchema = z.object({
  bills: z.array(BillSchema).optional(),
  amount: z.union([z.number(), z.string()]),
  phone: z.string().optional(),
  bank: z.string().optional(),
  dni: z.string().optional(),
  destination: z.string().optional(),
  dniType: z.string().optional(),
  prefix: z.string().optional(),
});
export type StickyDetails = z.infer<typeof StickyDetailsSchema>;

export const PaymentMethodElementSchema = z.object({
  method: z.string(),
  amount: z.union([z.number(), z.string()]),
  details: PaymentMethodDetailsSchema,
  isConfirmed: z.boolean(),
  type: z.string(),
});
export type PaymentMethodElement = z.infer<typeof PaymentMethodElementSchema>;

export const FbBodyShippingSchema = z.object({
  details: ShippingDetailsSchema,
  price: z.union([z.number(), z.number()]),
  type: z.string(),
});
export type FbBodyShipping = z.infer<typeof FbBodyShippingSchema>;

export const PositionMapValueSchema = z.object({
  fields: StickyFieldsSchema,
});
export type PositionMapValue = z.infer<typeof PositionMapValueSchema>;

export const FieldsCustomizedInvoiceSchema = z.object({
  mapValue: CustomizedInvoiceMapValueSchema,
});
export type FieldsCustomizedInvoice = z.infer<
  typeof FieldsCustomizedInvoiceSchema
>;

export const FieldsDiscountSchema = z.object({
  mapValue: DiscountMapValueSchema,
});
export type FieldsDiscount = z.infer<typeof FieldsDiscountSchema>;

export const PurpleValueSchema = z.object({
  mapValue: FluffyMapValueSchema,
});
export type PurpleValue = z.infer<typeof PurpleValueSchema>;

export const FieldsCompanySchema = z.object({
  mapValue: CompanyMapValueSchema,
});
export type FieldsCompany = z.infer<typeof FieldsCompanySchema>;

export const PurpleDetailsSchema = z.object({
  mapValue: IndigoMapValueSchema,
});
export type PurpleDetails = z.infer<typeof PurpleDetailsSchema>;

export const FluffyDetailsSchema = z.object({
  mapValue: HilariousMapValueSchema,
});
export type FluffyDetails = z.infer<typeof FluffyDetailsSchema>;

export const TentacledDetailsSchema = z.object({
  mapValue: AmbitiousMapValueSchema,
});
export type TentacledDetails = z.infer<typeof TentacledDetailsSchema>;

export const FieldsStatusSchema = z.object({
  mapValue: StatusMapValueSchema,
});
export type FieldsStatus = z.infer<typeof FieldsStatusSchema>;

export const IndigoValueSchema = z.object({
  mapValue: CunningMapValueSchema,
});
export type IndigoValue = z.infer<typeof IndigoValueSchema>;

export const AppSchema = z.object({
  _isDeleted: z.boolean(),
  _options: OptionsSchema,
  _config: ConfigSchema,
  _name: z.string(),
  _automaticDataCollectionEnabled: z.boolean(),
  _container: ContainerSchema,
});
export type App = z.infer<typeof AppSchema>;

export const ProductSchema = z.object({
  price_ref: z.string(),
  saleslast7days: z.union([z.number(), z.string()]),
  priceTotalClient: z.number(),
  required_recipe: z.boolean(),
  imageLarge: z.string(),
  price_total: z.string(),
  name: z.string(),
  x_studio_2x1: z.string(),
  offers: z.string(),
  laboratory: LaboratorySchema,
  id: z.number(),
  imageSmall: z.string(),
  x_studio_previous_price: z.string(),
  taxes: z.array(TaxSchema),
  discount_rate: z.string(),
  image: z.string().optional(),
  qty_available: z.number(),
  quantity: z.number(),
  subtotal: z.string(),
  taxes_ids: z.array(z.string()),
  subTotalClient: z.number(),
  product_type: ProductTypeSchema,
  imageUltraSmall: z.string(),
  tax: z.string(),
  categ_route: z.string(),
  currency: CurrencySchema,
  barcode: z.string(),
  price_extra: z.number(),
  price_unit: z.number(),
  moves_location_id: z.string().optional(),
  x_studio_libre_de_gluten: z.string(),
  imageXtraSmall: z.string(),
  move_location_id: z.string().optional(),
  recommended: z.union([z.boolean(), z.string()]),
  description: z.union([z.null(), z.string()]),
  x_studio_fecha_de_vencimiento: XStudioFechaDeVencimientoSchema,
  photo: z.string(),
  price: z.number(),
});
export type Product = z.infer<typeof ProductSchema>;

export const PurpleMethodSchema = z.object({
  isConfirmed: z.boolean(),
  details: StickyDetailsSchema,
  amount: z.number(),
  type: z.string(),
  method: z.string().optional(),
  totalPaid: z.number().optional(),
  status: z.number().optional(),
  message: z.string().optional(),
});
export type PurpleMethod = z.infer<typeof PurpleMethodSchema>;

export const FbBodyPaymentSchema = z.object({
  methods: z.array(PaymentMethodElementSchema),
  cashback: z.null(),
});
export type FbBodyPayment = z.infer<typeof FbBodyPaymentSchema>;

export const ReqBodySchema = z.object({
  addressId: z.string(),
  clientName: z.string(),
  customizedInvoice: OrderCustomizedInvoiceSchema,
  clientId: z.string(),
  shipping: FbBodyShippingSchema,
  tax: z.number(),
  odooOrder: OdooOrderSchema,
  payment: FbBodyPaymentSchema,
  coupon: z.string(),
  type: z.string(),
  prescriptions: z.array(z.any()),
  subtotal: z.number(),
  ref: z.number(),
});
export type ReqBody = z.infer<typeof ReqBodySchema>;

export const FieldsPositionSchema = z.object({
  mapValue: PositionMapValueSchema,
});
export type FieldsPosition = z.infer<typeof FieldsPositionSchema>;

export const FEproductsArrayValueSchema = z.object({
  values: z.array(PurpleValueSchema),
});
export type FEproductsArrayValue = z.infer<typeof FEproductsArrayValueSchema>;

export const CunningFieldsSchema = z.object({
  amount: CodeSchema,
  type: AddressIdSchema,
  id: CodeSchema,
  amount_type: AddressIdSchema,
  name: AddressIdSchema,
  description: AddressIdSchema,
  company: FieldsCompanySchema,
  price_include: InvoicePrintedSchema,
});
export type CunningFields = z.infer<typeof CunningFieldsSchema>;

export const BraggadociousFieldsSchema = z.object({
  details: FluffyDetailsSchema,
  isConfirmed: InvoicePrintedSchema,
  amount: RateSchema,
  type: AddressIdSchema,
});
export type BraggadociousFields = z.infer<typeof BraggadociousFieldsSchema>;

export const Fields2Schema = z.object({
  type: AddressIdSchema,
  price: RateSchema,
  details: TentacledDetailsSchema,
});
export type Fields2 = z.infer<typeof Fields2Schema>;

export const StepsArrayValueSchema = z.object({
  values: z.array(IndigoValueSchema),
});
export type StepsArrayValue = z.infer<typeof StepsArrayValueSchema>;

export const FirestoreSchema = z.object({
  app: AppSchema,
  databaseId: DatabaseIdSchema,
  settings: SettingsSchema,
});
export type Firestore = z.infer<typeof FirestoreSchema>;

export const UserDataWriterSchema = z.object({
  firestore: FirestoreSchema,
});
export type UserDataWriter = z.infer<typeof UserDataWriterSchema>;

export const OrderOdooDataOrderSchema = z.object({
  amount_total: z.number(),
  id: z.string(),
  name: z.string(),
  products: z.array(ProductSchema),
  create_date: z.coerce.date(),
});
export type OrderOdooDataOrder = z.infer<typeof OrderOdooDataOrderSchema>;

export const OrderPaymentSchema = z.object({
  type: z.string(),
  amigaDetails: AmigaDetailsSchema.optional(),
  cashback: CashbackSchema.optional(),
  moveData: z.boolean().optional(),
  amount: z.number(),
  methods: z.array(PurpleMethodSchema),
  details: PaymentDetailsSchema.optional(),
});
export type OrderPayment = z.infer<typeof OrderPaymentSchema>;

export const FbBodySchema = z.object({
  onPacking: z.string(),
  totalUserSaw: z.number(),
  statusCode: z.number(),
  customizedInvoice: OrderCustomizedInvoiceSchema,
  clientName: z.string(),
  shipping: FbBodyShippingSchema,
  odooDataOrder: OrderOdooDataOrderSchema,
  coupon: z.string(),
  subtotalUserSaw: z.number(),
  tasaUserSaw: z.number(),
  tax: z.number(),
  prescriptions: z.array(z.any()),
  clientId: z.string(),
  steps: z.array(StepSchema),
  code: z.number(),
  ref: z.number(),
  status: FbBodyStatusSchema,
  isFinished: z.boolean(),
  invoicePrinted: z.boolean(),
  prescription: z.boolean(),
  webOrApp: z.string(),
  FEproducts: z.array(ProductListElementSchema),
  addressId: z.string(),
  iosOrAnd: z.string(),
  tasa: z.number(),
  addressDetails: OrderAddressDetailsSchema,
  discount: OrderDiscountSchema,
  isAssigned: z.boolean(),
  date: TimestampClassSchema,
  payment: FbBodyPaymentSchema,
  total: z.number(),
});
export type FbBody = z.infer<typeof FbBodySchema>;

export const TentacledFieldsSchema = z.object({
  street: AddressIdSchema,
  default: InvoicePrintedSchema,
  alias: AddressIdSchema,
  deletedAt: DeletedAtSchema,
  state: DeletedAtSchema,
  zone: DeletedAtSchema,
  city: AddressIdSchema,
  id: AddressIdSchema,
  creationDate: CodeSchema,
  routeId: AddressIdSchema,
  instructions: AddressIdSchema,
  prettyAddress: AddressIdSchema,
  type: AddressIdSchema,
  addressId: AddressIdSchema,
  position: FieldsPositionSchema,
  phone: AddressIdSchema,
  house: AddressIdSchema,
});
export type TentacledFields = z.infer<typeof TentacledFieldsSchema>;

export const FEproductsSchema = z.object({
  arrayValue: FEproductsArrayValueSchema,
});
export type FEproducts = z.infer<typeof FEproductsSchema>;

export const StickyMapValueSchema = z.object({
  fields: CunningFieldsSchema,
});
export type StickyMapValue = z.infer<typeof StickyMapValueSchema>;

export const IndecentMapValueSchema = z.object({
  fields: BraggadociousFieldsSchema,
});
export type IndecentMapValue = z.infer<typeof IndecentMapValueSchema>;

export const ShippingMapValueSchema = z.object({
  fields: Fields2Schema,
});
export type ShippingMapValue = z.infer<typeof ShippingMapValueSchema>;

export const StepsSchema = z.object({
  arrayValue: StepsArrayValueSchema,
});
export type Steps = z.infer<typeof StepsSchema>;

export const RequiredToCheckInventarySchema = z.object({
  igtfControl: IgtfControlSchema,
  paymentMethods: z.array(PaymentMethodElementSchema),
  orderId: z.string(),
  fbBody: FbBodySchema,
  reqBody: ReqBodySchema,
  tasaDolar: z.number(),
  odooDataOrder: OrderOdooDataOrderSchema,
});
export type RequiredToCheckInventary = z.infer<
  typeof RequiredToCheckInventarySchema
>;

export const AddressDetailsMapValueSchema = z.object({
  fields: TentacledFieldsSchema,
});
export type AddressDetailsMapValue = z.infer<
  typeof AddressDetailsMapValueSchema
>;

export const TentacledValueSchema = z.object({
  mapValue: StickyMapValueSchema,
});
export type TentacledValue = z.infer<typeof TentacledValueSchema>;

export const StickyValueSchema = z.object({
  mapValue: IndecentMapValueSchema,
});
export type StickyValue = z.infer<typeof StickyValueSchema>;

export const FieldsShippingSchema = z.object({
  mapValue: ShippingMapValueSchema,
});
export type FieldsShipping = z.infer<typeof FieldsShippingSchema>;

export const OrderSchema = z.object({
  id: z.string(),
  statusCode: z.number(),
  tasaUserSaw: z.number(),
  rate: z.number(),
  invoicePrinted: z.boolean(),
  isAssigned: z.boolean(),
  clientId: z.string(),
  payment: OrderPaymentSchema,
  tasa: z.number(),
  tax: z.number(),
  isFinished: z.boolean(),
  odooDataOrder: OrderOdooDataOrderSchema,
  coupon: z.string(),
  iosOrAnd: z.string(),
  addressId: z.string(),
  addressDetails: OrderAddressDetailsSchema,
  status: FbBodyStatusSchema,
  shipping: FbBodyShippingSchema,
  discount: OrderDiscountSchema,
  requiredToCheckInventary: RequiredToCheckInventarySchema.optional(),
  steps: z.array(StepSchema),
  prescription: z.boolean(),
  IGTF: z.number().optional(),
  clientName: z.string(),
  webOrApp: z.string(),
  totalUserSaw: z.number(),
  total: z.number(),
  onPacking: z.string(),
  FEproducts: z.array(FEproductSchema),
  subtotalUserSaw: z.number(),
  date: TimestampClassSchema,
  code: z.number(),
  customizedInvoice: OrderCustomizedInvoiceSchema,
  prescriptions: z.array(z.any()),
  ref: z.number(),
  company: z.string().optional(),
  deviceId: z.string().optional(),
});
export type Order = z.infer<typeof OrderSchema>;

export const FieldsAddressDetailsSchema = z.object({
  mapValue: AddressDetailsMapValueSchema,
});
export type FieldsAddressDetails = z.infer<typeof FieldsAddressDetailsSchema>;

export const TaxesArrayValueSchema = z.object({
  values: z.array(TentacledValueSchema),
});
export type TaxesArrayValue = z.infer<typeof TaxesArrayValueSchema>;

export const MethodsArrayValueSchema = z.object({
  values: z.array(StickyValueSchema),
});
export type MethodsArrayValue = z.infer<typeof MethodsArrayValueSchema>;

export const TaxesSchema = z.object({
  arrayValue: TaxesArrayValueSchema,
});
export type Taxes = z.infer<typeof TaxesSchema>;

export const MethodsSchema = z.object({
  arrayValue: MethodsArrayValueSchema,
});
export type Methods = z.infer<typeof MethodsSchema>;

export const AmbitiousFieldsSchema = z.object({
  categ_route: AddressIdSchema,
  x_studio_2x1: AddressIdSchema,
  move_location_id: AddressIdSchema.optional(),
  priceTotalClient: RateSchema,
  image: AddressIdSchema.optional(),
  description: DescriptionClassSchema,
  id: CodeSchema,
  price_extra: RateSchema,
  x_studio_previous_price: AddressIdSchema,
  taxes_ids: TaxesIdsSchema,
  saleslast7days: Saleslast7DaysClassSchema,
  recommended: RecommendedClassSchema,
  qty_available: CodeSchema,
  subtotal: AddressIdSchema,
  laboratory: AddressIdSchema,
  name: AddressIdSchema,
  price_ref: AddressIdSchema,
  moves_location_id: AddressIdSchema.optional(),
  subTotalClient: RateSchema,
  required_recipe: InvoicePrintedSchema,
  tax: AddressIdSchema,
  product_type: AddressIdSchema,
  price_total: AddressIdSchema,
  x_studio_fecha_de_vencimiento: AddressIdSchema,
  imageLarge: AddressIdSchema,
  imageXtraSmall: AddressIdSchema,
  price_unit: RateSchema,
  imageUltraSmall: AddressIdSchema,
  discount_rate: AddressIdSchema,
  currency: AddressIdSchema,
  quantity: CodeSchema,
  price: RateSchema,
  barcode: AddressIdSchema,
  photo: AddressIdSchema,
  taxes: TaxesSchema,
  imageSmall: AddressIdSchema,
  x_studio_libre_de_gluten: AddressIdSchema,
  offers: AddressIdSchema,
});
export type AmbitiousFields = z.infer<typeof AmbitiousFieldsSchema>;

export const FriskyFieldsSchema = z.object({
  amount: RateSchema,
  type: AddressIdSchema,
  details: PurpleDetailsSchema,
  methods: MethodsSchema,
});
export type FriskyFields = z.infer<typeof FriskyFieldsSchema>;

export const TentacledMapValueSchema = z.object({
  fields: AmbitiousFieldsSchema,
});
export type TentacledMapValue = z.infer<typeof TentacledMapValueSchema>;

export const PaymentMapValueSchema = z.object({
  fields: FriskyFieldsSchema,
});
export type PaymentMapValue = z.infer<typeof PaymentMapValueSchema>;

export const FluffyValueSchema = z.object({
  mapValue: TentacledMapValueSchema,
});
export type FluffyValue = z.infer<typeof FluffyValueSchema>;

export const FieldsPaymentSchema = z.object({
  mapValue: PaymentMapValueSchema,
});
export type FieldsPayment = z.infer<typeof FieldsPaymentSchema>;

export const ProductsArrayValueSchema = z.object({
  values: z.array(FluffyValueSchema),
});
export type ProductsArrayValue = z.infer<typeof ProductsArrayValueSchema>;

export const ProductsSchema = z.object({
  arrayValue: ProductsArrayValueSchema,
});
export type Products = z.infer<typeof ProductsSchema>;

export const HilariousFieldsSchema = z.object({
  amount_total: CodeSchema,
  name: AddressIdSchema,
  id: AddressIdSchema,
  create_date: AddressIdSchema,
  products: ProductsSchema,
});
export type HilariousFields = z.infer<typeof HilariousFieldsSchema>;

export const OdooDataOrderMapValueSchema = z.object({
  fields: HilariousFieldsSchema,
});
export type OdooDataOrderMapValue = z.infer<typeof OdooDataOrderMapValueSchema>;

export const FieldsOdooDataOrderSchema = z.object({
  mapValue: OdooDataOrderMapValueSchema,
});
export type FieldsOdooDataOrder = z.infer<typeof FieldsOdooDataOrderSchema>;

export const PurpleFieldsSchema = z.object({
  tasaUserSaw: CodeSchema,
  deviceId: AddressIdSchema,
  invoicePrinted: InvoicePrintedSchema,
  tasa: RateSchema,
  coupon: AddressIdSchema,
  discount: FieldsDiscountSchema,
  subtotalUserSaw: RateSchema,
  company: AddressIdSchema,
  totalUserSaw: CodeSchema,
  prescription: InvoicePrintedSchema,
  isFinished: InvoicePrintedSchema,
  addressId: AddressIdSchema,
  onPacking: AddressIdSchema,
  code: CodeSchema,
  shipping: FieldsShippingSchema,
  clientId: AddressIdSchema,
  statusCode: CodeSchema,
  customizedInvoice: FieldsCustomizedInvoiceSchema,
  ref: RateSchema,
  addressDetails: FieldsAddressDetailsSchema,
  steps: StepsSchema,
  date: FieldsDateSchema,
  status: FieldsStatusSchema,
  payment: FieldsPaymentSchema,
  odooDataOrder: FieldsOdooDataOrderSchema,
  total: RateSchema,
  webOrApp: AddressIdSchema,
  tax: CodeSchema,
  clientName: AddressIdSchema,
  FEproducts: FEproductsSchema,
  rate: RateSchema,
  prescriptions: FEproductsSchema,
  isAssigned: InvoicePrintedSchema,
  iosOrAnd: AddressIdSchema,
});
export type PurpleFields = z.infer<typeof PurpleFieldsSchema>;

export const PurpleMapValueSchema = z.object({
  fields: PurpleFieldsSchema,
});
export type PurpleMapValue = z.infer<typeof PurpleMapValueSchema>;

export const DataValueSchema = z.object({
  mapValue: PurpleMapValueSchema,
});
export type DataValue = z.infer<typeof DataValueSchema>;

export const DataSchema = z.object({
  value: DataValueSchema,
});
export type Data = z.infer<typeof DataSchema>;

export const DocumentSchema = z.object({
  key: KeySchema,
  documentType: z.number(),
  version: CreateTimeSchema,
  readTime: CreateTimeSchema,
  createTime: CreateTimeSchema,
  data: DataSchema,
  documentState: z.number(),
});
export type Document = z.infer<typeof DocumentSchema>;

export const LastVisibleSchema = z.object({
  _firestore: FirestoreSchema,
  _userDataWriter: UserDataWriterSchema,
  _key: KeySchema,
  _document: DocumentSchema,
  _converter: z.null(),
  _firestoreImpl: FirestoreSchema,
  metadata: MetadataSchema,
});
export type LastVisible = z.infer<typeof LastVisibleSchema>;

export const PageSchema = z.object({
  orders: z.array(OrderSchema),
  lastVisible: LastVisibleSchema,
});
export type Page = z.infer<typeof PageSchema>;

export const OrdersResponseSchema = z.object({
  pages: z.array(PageSchema),
  pageParams: z.array(z.number()),
});
export type OrdersResponse = z.infer<typeof OrdersResponseSchema>;
