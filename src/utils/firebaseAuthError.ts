import type { FirebaseError } from "firebase/app";

export const getFirebaseAuthErrorMessage = (
    error: unknown
): string => {
    if (!(error instanceof Error)) {
        return "Ocurrió un error inesperado.";
    }

    const firebaseError = error as FirebaseError;

    switch (firebaseError.code) {
        case "auth/invalid-credential":
            return "El correo o la contraseña son incorrectos.";

        case "auth/user-not-found":
            return "No existe una cuenta con este correo.";

        case "auth/wrong-password":
            return "La contraseña es incorrecta.";

        case "auth/email-already-in-use":
            return "Este correo ya está registrado.";

        case "auth/invalid-email":
            return "El correo electrónico no es válido.";

        case "auth/weak-password":
            return "La contraseña es demasiado débil.";

        case "auth/popup-closed-by-user":
            return "Se cerró la ventana de Google antes de completar el inicio de sesión.";

        case "auth/popup-blocked":
            return "El navegador bloqueó la ventana de inicio de sesión.";

        case "auth/cancelled-popup-request":
            return "La solicitud de inicio de sesión fue cancelada.";

        default:
            return "Ocurrió un error al autenticarte. Intenta nuevamente.";
    }
};