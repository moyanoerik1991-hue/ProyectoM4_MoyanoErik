import { useState } from "react";
import { useAuth } from "../../hooks/useAuth.ts";
import { Input } from "../ui/Input.tsx";
import { Button } from "../ui/Button.tsx";
import { PasswordInput } from "../ui/PasswordInput.tsx"
import { getFirebaseAuthErrorMessage } from "../../utils/firebaseAuthError.ts";
import { validateLogin } from "../../utils/authValidation.ts";

interface LoginFormProps {
    onLoginSuccess: () => void;
}

export const LoginForm = ({
    onLoginSuccess,
}: LoginFormProps) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const { login, loginWithGoogle } = useAuth();

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        setError(null);

        const validationError = validateLogin(
            email,
            password
        );

        if (validationError) {
            setError(validationError);
            return;
        }

        try {
            setLoading(true);

            await login(
                email.trim().toLowerCase(),
                password
            );

            onLoginSuccess();
        } catch (error) {
            setError(
                getFirebaseAuthErrorMessage(error)
            );
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setError(null);

        try {
            setLoading(true);

            await loginWithGoogle();

            onLoginSuccess();
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
            <h2>Iniciar sesión</h2>

            {error && <p>{error}</p>}

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

            <Button
                label={
                    loading
                        ? "Conectando..."
                        : "Iniciar sesión"
                }
                type="submit"
                disabled={loading}
            />

            <Button
                label="Continuar con Google"
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading}
            />
        </form>
    );
};