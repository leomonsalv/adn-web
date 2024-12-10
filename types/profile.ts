import * as z from 'zod'

export const OtpDataSchema = z.object({
  validation: z.boolean(),
  message: z.string(),
})
export type OtpDataResponse = z.infer<typeof OtpDataSchema>

export const ValidateOtpResponseSchema = z.object({
  data: OtpDataSchema,
})
export type ValidateOtpResponse = z.infer<typeof ValidateOtpResponseSchema>
