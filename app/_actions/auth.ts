import { FormState, SignInFormSchema } from "@/schemas/login-form";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { auth, provider } from "@/lib/firebaseConfig";
import { RegisterFormSchema } from "@/schemas/register-form";

export async function signInAction(state: FormState, formData: FormData) {
  const validatedFields = SignInFormSchema.safeParse({
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

  try {
    // Mantiene al usuario conectado mientras tenga la pestaña abierta
    await setPersistence(auth, browserSessionPersistence);
    const userCredential = await signInWithEmailAndPassword(
      auth,
      validatedFields.data.email,
      validatedFields.data.password,
    );

    const user = userCredential.user;
    return { success: true, user };
  } catch (error: any) {
    console.error("Error al iniciar sesión con correo y contraseña:", error);
    return {
      success: false,
      errorCode: error.code,
      errorMessage: error.message,
    };
  }
}

export async function signInWithGoogle() {
  try {
    // Mantiene al usuario conectado mientras tenga la pestaña abierta
    await setPersistence(auth, browserSessionPersistence);

    const result = await signInWithPopup(auth, provider);

    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    const user = result.user;

    return { success: true, user, token };
  } catch (error: any) {
    console.error("Error al iniciar sesión con Google:", error);

    return {
      success: false,
      errorCode: error.code,
      errorMessage: error.message,
    };
  }
}

export async function registerAction(state: FormState, formData: FormData) {
  const validatedFields = RegisterFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    referral: formData.get("referral"),
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

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      validatedFields.data.email,
      validatedFields.data.password,
    );

    const user = userCredential.user;
    return { success: true, user };
  } catch (error: any) {
    console.error("Error al crear un nuevo usuario:", error);
    return {
      success: false,
      errorCode: error.code,
      errorMessage: error.message,
    };
  }
}
