import { UserProfileSchema } from "@/schemas/user-form";
import { auth, db } from "@/lib/firebaseConfig";
import { updateProfile } from "firebase/auth";

/**
 * Actualiza el perfil del usuario autenticado en Firebase.
 *
 * @param state Estado del formulario (no usado aquí, pero incluido para consistencia).
 * @param formData Datos del formulario enviados.
 * @returns {Object} Resultado de la operación con éxito o errores.
 */
export async function updateUserProfileAction(
  state: any,
  formData: FormData,
): Promise<object> {
  const validatedFields = UserProfileSchema.safeParse({
    fullName: formData.get("fullName"),
    idDocument: formData.get("idDocument"),
    phoneNumber: formData.get("phoneNumber"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    console.warn(
      "Validación fallida:",
      validatedFields.error.flatten().fieldErrors,
    );
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const user = auth.currentUser;

  if (!user) {
    console.error("No hay un usuario autenticado.");
    return { success: false, errorCode: "user-not-authenticated" };
  }

  try {
    await updateProfile(user, {
      displayName: validatedFields.data.fullName,
    });
    return { success: true };
  } catch (error: any) {
    console.error("Error al actualizar el perfil del usuario:", error);
    return {
      success: false,
      errorCode: error.code,
      errorMessage: error.message,
    };
  }
}
