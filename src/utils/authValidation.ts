const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateLogin = (
    email: string,
    password: string
): string | null => {
    if (!email.trim() || !password) {
        return "Todos los campos son obligatorios.";
    }

    if (!emailRegex.test(email)) {
        return "Ingresa un correo electrónico válido.";
    }

    if (password.length < 6) {
        return "La contraseña debe tener al menos 6 caracteres.";
    }

    return null;
};

export const validateRegister = (
    userName: string,
    email: string,
    password: string,
    confirmPassword: string
): string | null => {
    if (
        !userName.trim() ||
        !email.trim() ||
        !password ||
        !confirmPassword
    ) {
        return "Todos los campos son obligatorios.";
    }

    if (userName.trim().length < 3) {
        return "El nombre de usuario debe tener al menos 3 caracteres.";
    }

    if (!emailRegex.test(email)) {
        return "Ingresa un correo electrónico válido.";
    }

    if (password.length < 6) {
        return "La contraseña debe tener al menos 6 caracteres.";
    }

    if (password !== confirmPassword) {
        return "Las contraseñas no coinciden.";
    }

    return null;
};