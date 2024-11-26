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
    // GOOGLE NORMAL SIGN IN
    const userCredential = setPersistence(auth, browserSessionPersistence)
      .then(async () => {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          validatedFields.data.email,
          validatedFields.data.password,
        );
        return userCredential.user;
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        return errorMessage;
      });

    const user = userCredential;
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

export async function registerAction(state: FormState, formData: FormData) {
  const validatedFields = RegisterFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    referral: formData.get("referral"),
  });

  console.log(validatedFields);

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
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      validatedFields.data.email,
      validatedFields.data.password,
    );

    const user = userCredential.user;
    console.log("Creación de usuario exitosa:", user);

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
