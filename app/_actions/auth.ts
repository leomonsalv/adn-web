import { FormState, SignInFormSchema } from "@/schemas/login";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth, provider } from "@/lib/firebaseConfig";

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
    // GOOGLE NORMAL SIGN IN
    const userCredential = await signInWithEmailAndPassword(
      auth,
      validatedFields.data.email,
      validatedFields.data.password,
    );

    const user = userCredential.user;
    console.log("Inicio de sesión exitoso:", user);

    return { success: true, user };
  } catch (error: any) {
    console.error("Error al iniciar sesión con correo y contraseña:", error);
    const errorCode = error.code;
    const errorMessage = error.message;

    return {
      errorCode: errorCode,
      errorMessage: errorMessage,
    };
  }
}

export async function signInWithGoogle() {
  // GOOGLE SIGN IN BUTTON
  try {
    const result = await signInWithPopup(auth, provider);

    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;

    const user = result.user;

    return { success: true, user, token };
  } catch (error: any) {
    console.error("Error al iniciar sesión con Google:", error);

    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData?.email || null;
    const credential = GoogleAuthProvider.credentialFromError(error);

    return {
      success: false,
      error: { errorCode, errorMessage, email, credential },
    };
  }
}
