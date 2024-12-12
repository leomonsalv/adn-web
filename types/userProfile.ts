import {
  FavoriteSchema,
  InvoiceDataSchema,
  LastDeductionDateSchema,
  EmailSchema,
  MessageSchema,
  OdooSchema,
  LastAdminUpdateSchema,
  NotificationSettingsSchema,
  WalletSchema,
  UserProfileDataSchema,
} from '@/schemas/user-profile-schema'
import { z } from 'zod'

export interface UpdateUserProfileInput {
  fullName?: string
  idDocument?: string
  phoneNumber?: string
  email?: string
  validatedEmail?: boolean
  validatedPhone?: boolean
}

export type Favorite = z.infer<typeof FavoriteSchema>
export type InvoiceData = z.infer<typeof InvoiceDataSchema>
export type LastDeductionDate = z.infer<typeof LastDeductionDateSchema>
export type Email = z.infer<typeof EmailSchema>
export type Message = z.infer<typeof MessageSchema>
export type Odoo = z.infer<typeof OdooSchema>
export type LastAdminUpdate = z.infer<typeof LastAdminUpdateSchema>
export type NotificationSettings = z.infer<typeof NotificationSettingsSchema>
export type Wallet = z.infer<typeof WalletSchema>
export type UserProfileData = z.infer<typeof UserProfileDataSchema>
