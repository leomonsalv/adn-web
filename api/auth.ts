import { User } from 'firebase/auth'
import { httpsCallable } from 'firebase/functions'
import { db, functions } from '@/lib/firebaseConfig'
import { OTP_GENERATION, OTP_VALIDATION, OTP_EMAIL_GENERATOR, USERDELETE } from '@/lib/urls'

import {
  OtpProfileSchema,
  PartialUserProfileUpdateSchema,
  PhoneOtpProfileSchema,
} from '@/schemas/user-form'
import { auth } from '@/lib/firebaseConfig'
import { updateProfile } from 'firebase/auth'
import { doc, updateDoc } from 'firebase/firestore'

export const deleteAccount = async (user: User) => {
  try {
    const response = await httpsCallable(functions, USERDELETE)()
    return response.data
  } catch (error) {
    console.error('Error deleting account:', error)
    throw error
  }
}

export async function updateUserProfile(data: { [key: string]: any }) {
  const validatedFields = PartialUserProfileUpdateSchema.safeParse(data)

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const user = auth.currentUser
  if (!user) {
    return { success: false, errorCode: 'user-not-authenticated' }
  }

  const { fullName, idDocument } = validatedFields.data

  try {
    if (fullName) {
      const docRef = doc(db, 'users', user.uid)
      await updateProfile(user, { displayName: fullName })
      await updateDoc(docRef, { 'invoiceData.fullname': fullName })
    }

    if (idDocument) {
      const docRef = doc(db, 'users', user.uid)
      await updateDoc(docRef, { 'invoiceData.dni': idDocument })
    }

    return { success: true }
  } catch (error: any) {
    return {
      success: false,
      errorCode: error.code,
      errorMessage: error.message,
    }
  }
}

/**
 * Solicita un OTP para el teléfono del usuario autenticado.
 */
export async function requestUserPhoneOTP(
  phoneNumber: string,
): Promise<{ validation: boolean; errorMessage?: string }> {
  const validatedFields = PhoneOtpProfileSchema.safeParse({ phoneNumber })
  if (!validatedFields.success) {
    return {
      validation: false,
      errorMessage: 'Número de teléfono inválido.',
    }
  }

  const user = auth.currentUser
  if (!user) {
    return { validation: false, errorMessage: 'No user authenticated.' }
  }

  try {
    const generateOtp = httpsCallable(functions, OTP_GENERATION)
    await generateOtp({ userPhone: validatedFields.data.phoneNumber, userId: user.uid })
    return { validation: true }
  } catch (error: any) {
    console.error('Error al generar OTP de teléfono:', error)
    return {
      validation: false,
      errorMessage: error.message || 'Error al solicitar el OTP de teléfono.',
    }
  }
}

/**
 * Valida el OTP de teléfono ingresado por el usuario.
 */
export async function validateUserPhoneOTP(
  otp: string,
): Promise<{ validation: boolean; message?: string }> {
  const validatedFields = OtpProfileSchema.safeParse({ otp })
  if (!validatedFields.success) {
    return { validation: false, message: 'OTP inválido.' }
  }

  const user = auth.currentUser
  if (!user) {
    return { validation: false, message: 'No user authenticated.' }
  }

  try {
    const validateOtp = httpsCallable(functions, OTP_VALIDATION)
    const response = await validateOtp({ smsOTP: validatedFields.data.otp, userId: user.uid })
    const data = response.data as { validation: boolean; message?: string }
    return data
  } catch (error: any) {
    console.error('Error al validar OTP de teléfono:', error)
    return {
      validation: false,
      message: error.message || 'Error al validar el OTP de teléfono.',
    }
  }
}

/**
 * Solicita un OTP para el email del usuario autenticado.
 */
export async function requestUserEmailOTP(
  email: string,
): Promise<{ validation: boolean; errorMessage?: string }> {
  const user = auth.currentUser
  if (!user) {
    return { validation: false, errorMessage: 'No user authenticated.' }
  }

  try {
    const generateEmailOtp = httpsCallable(functions, OTP_EMAIL_GENERATOR)
    await generateEmailOtp({ userEmail: email, userId: user.uid })
    return { validation: true }
  } catch (error: any) {
    console.error('Error al generar OTP de email:', error)
    return {
      validation: false,
      errorMessage: error.message || 'Error al solicitar el OTP de email.',
    }
  }
}

/**
 * Valida el OTP de email ingresado por el usuario.
 */
export async function validateUserEmailOTP(
  otp: string,
): Promise<{ validation: boolean; message?: string }> {
  const validatedFields = OtpProfileSchema.safeParse({ otp })
  if (!validatedFields.success) {
    return { validation: false, message: 'OTP inválido.' }
  }

  const user = auth.currentUser
  if (!user) {
    return { validation: false, message: 'No user authenticated.' }
  }

  try {
    const validateEmailOtp = httpsCallable(functions, OTP_VALIDATION)
    const response = await validateEmailOtp({
      emailOTP: validatedFields.data.otp,
      userId: user.uid,
    })
    const data = response.data as { validation: boolean; message?: string }
    return data
  } catch (error: any) {
    console.error('Error al validar OTP de email:', error)
    return {
      validation: false,
      message: error.message || 'Error al validar el OTP de email.',
    }
  }
}
