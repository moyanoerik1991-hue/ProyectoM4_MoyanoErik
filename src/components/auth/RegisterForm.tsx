import { useState } from "react";
import { useAuth } from "../../hooks/useAuth.ts";
import { Input } from "../ui/Input.tsx";
import { Button } from "../ui/Button.tsx";
import { PasswordInput } from "../ui/PasswordInput.tsx"
import { getFirebaseAuthErrorMessage } from "../../utils/firebaseAuthError.ts";
import { validateRegister } from "../../utils/authValidation.ts";

interface RegisterFormProps {
    onRegisterSuccess: () => void;
}

export const RegisterForm = ({
    onRegisterSuccess,
}: RegisterFormProps) => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] =
        useState("");

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const {
        register,
        loginWithGoogle,
    } = useAuth();

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        setError(null);

        const validationError = validateRegister(
            userName,
            email,
            password,
            confirmPassword
        );

        if (validationError) {
            setError(validationError);
            return;
        }

        try {
            setLoading(true);

            await register(
                userName.trim(),
                email.trim().toLowerCase(),
                password
            );

            onRegisterSuccess();
        } catch (error) {
            setError(
                getFirebaseAuthErrorMessage(error)
            );
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleRegister = async () => {
        setError(null);

        try {
            setLoading(true);

            await loginWithGoogle();

            onRegisterSuccess();
        } catch (error) {
            setError(
                getFirebaseAuthErrorMessage(error)
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Crear cuenta</h2>

            {error && <p>{error}</p>}

            <Input
                label="Usuario"
                type="text"
                placeholder="Nombre de usuario"
                value={userName}
                onChange={(e) =>
                    setUserName(e.target.value)
                }
            />

            <Input
                label="Email"
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <PasswordInput
                label="Contraseña"
                placeholder="Contraseña"
                value={password}
                onChange={(e) =>
                    setPassword(e.target.value)
                }
            />

            <PasswordInput
                label="Confirmar contraseña"
                placeholder="Confirmar contraseña"
                value={confirmPassword}
                onChange={(e) =>
                    setConfirmPassword(e.target.value)
                }
            />

            <Button
                label={
                    loading
                        ? "Creando cuenta..."
                        : "Registrarse"
                }
                type="submit"
                disabled={loading}
            />

            <Button
                label="Continuar con Google"
                type="button"
                onClick={handleGoogleRegister}
                disabled={loading}
            />
        </form>
    );
};