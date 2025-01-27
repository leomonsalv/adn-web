import * as z from 'zod';

export const FavoriteSchema = z.object({
  isDefault: z.boolean(),
  items: z.array(z.any()),
  name: z.string(),
});

export const InvoiceDataSchema = z.object({
  dniType: z.enum(['V', 'E', 'P', 'J', 'G']),
  email: z.string(),
  prefix: z.string(),
  dni: z.string(),
  fullname: z.string(),
  phone: z.string(),
});

export const LastDeductionDateSchema = z.object({
  seconds: z.number(),
  nanoseconds: z.number(),
});

export const EmailSchema = z.object({
  mailing: z.boolean(),
  prescription: z.boolean(),
  digitalRecipes: z.boolean(),
});

export const MessageSchema = z.object({
  weekly: z.boolean(),
  prescription: z.boolean(),
});

export const OdooSchema = z.object({
  partnerId: z.number(),
  locationId: z.number(),
  companyId: z.number(),
});

export const LastAdminUpdateSchema = z.object({
  replace: z.boolean(),
  date: LastDeductionDateSchema,
  by: z.string(),
});

export const NotificationSettingsSchema = z.object({
  email: EmailSchema,
  message: MessageSchema,
  push: MessageSchema,
  disableAll: z.boolean(),
});

export const WalletSchema = z.object({
  lastAdminUpdate: LastAdminUpdateSchema,
  backupCompany: z.number(),
  company: z.string(),
  creditTop: z.number(),
  lastUpdate: LastDeductionDateSchema,
  credit: z.number(),
});

export const UserProfileDataSchema = z.object({
  preWallet: WalletSchema,
  cart: z.array(z.any()),
  invoiceData: InvoiceDataSchema,
  validatedEmail: z.boolean(),
  phone: z.string(),
  lastDeductionDate: LastDeductionDateSchema,
  provider: z.string(),
  odoo: OdooSchema,
  notificationSettings: NotificationSettingsSchema,
  lastSeen: LastDeductionDateSchema,
  wallet: WalletSchema,
  validatedDni: z.boolean(),
  email: z.string(),
  validatedPhone: z.boolean(),
  otpExpire: LastDeductionDateSchema,
  favorites: z.array(FavoriteSchema),
  name: z.string(),
  dniType: z.string(),
});
