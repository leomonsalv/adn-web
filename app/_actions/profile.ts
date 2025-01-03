import {
  OtpProfileSchema,
  PhoneOtpProfileSchema,
  PartialUserProfileUpdateSchema,
} from '@/schemas/user-form';
import { auth } from '@/lib/firebaseConfig';
import { updateProfile } from 'firebase/auth';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { OTP_GENERATION, OTP_VALIDATION } from '@/lib/urls';

/**
 * Actualiza el perfil del usuario autenticado en Firebase.
 *
 * @param state Estado del formulario.
 * @param formData Datos del formulario enviados.
 * @returns {Object} Resultado de la operación con éxito o errores.
 */
export async function updateUserProfileAction(state: any, formData: FormData): Promise<object> {
  const validatedFields = PartialUserProfileUpdateSchema.safeParse({
    fullName: formData.get('fullName'),
    idDocument: formData.get('idDocument'),
    // phoneNumber: formData.get('phoneNumber'),
    // email: formData.get('email'),
    // password: formData.get('password'),
  });

  if (!validatedFields.success) {
    console.warn('Validación fallida:', validatedFields.error.flatten().fieldErrors);
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const user = auth.currentUser;

  if (!user) {
    console.error('No hay un usuario autenticado.');
    return { success: false, errorCode: 'user-not-authenticated' };
  }

  try {
    await updateProfile(user, {
      displayName: validatedFields.data.fullName,
    });
    return { success: true };
  } catch (error: any) {
    console.error('Error al actualizar el perfil del usuario:', error);
    return {
      success: false,
      errorCode: error.code,
      errorMessage: error.message,
    };
  }
}

export async function requestUserOTPAction(state: any, formData: FormData): Promise<object> {
  // Validar los campos
  const validatedFields = PhoneOtpProfileSchema.safeParse({
    phoneNumber: formData.get('phoneNumber'),
  });

  if (!validatedFields.success) {
    console.warn('Validación fallida:', validatedFields.error.flatten().fieldErrors);
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Obtener usuario autenticado
  const user = auth.currentUser;

  if (!user) {
    console.error('No hay un usuario autenticado.');
    return { success: false, errorCode: 'user-not-authenticated' };
  }

  try {
    // Llamada a la función httpsCallable
    const functions = getFunctions();
    const generateOtp = httpsCallable(functions, OTP_GENERATION);

    await generateOtp({
      userPhone: validatedFields.data.phoneNumber, // Usar el número validado
      userId: user.uid,
    });

    return { validation: true };
  } catch (error: any) {
    console.error('Error al generar OTP:', error);
    return {
      success: false,
      errorCode: error.code,
      errorMessage: error.message,
    };
  }
}

export async function validatedUserPhoneOTP(state: any, formData: FormData): Promise<Object> {
  // Validar los campos
  const validatedFields = OtpProfileSchema.safeParse({
    otp: formData.get('otp'), //OTP number
  });

  if (!validatedFields.success) {
    console.warn('Validación fallida:', validatedFields.error.flatten().fieldErrors);
    return {
      validation: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const user = auth.currentUser;

  if (!user) {
    console.error('No hay un usuario autenticado.');
    return { validation: false, errorCode: 'user-not-authenticated' };
  }

  try {
    const functions = getFunctions();
    const generateOtp = httpsCallable(functions, OTP_VALIDATION);

    const response = await generateOtp({
      smsOTP: validatedFields.data.otp,
      userId: user.uid,
    });

    return { data: response.data };
  } catch (error: any) {
    console.error('Error al generar OTP:', error);
    return {
      errors: error.message,
      // success: false,
      // errorCode: error.validation,
      // errorMessage: error.message,
    };
  }
}
