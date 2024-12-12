// hooks/use-otp-verification.ts
'use client'

import { useMutation } from '@tanstack/react-query'
import {
  requestUserPhoneOTP,
  validateUserPhoneOTP,
  requestUserEmailOTP,
  validateUserEmailOTP,
} from '@/api/auth'

interface OtpResponse {
  validation: boolean
  message?: string
}

export function useOTPVerification(otpType: 'phone' | 'email') {
  const sendOTPMutation = useMutation({
    mutationFn: async (identifier: string) => {
      if (otpType === 'phone') {
        return requestUserPhoneOTP(identifier)
      } else {
        return requestUserEmailOTP(identifier)
      }
    },
  })

  const validateOTPMutation = useMutation({
    mutationFn: async (otp: string) => {
      if (otpType === 'phone') {
        return validateUserPhoneOTP(otp)
      } else {
        return validateUserEmailOTP(otp)
      }
    },
  })

  return {
    sendOTPMutation,
    validateOTPMutation,
  }
}
