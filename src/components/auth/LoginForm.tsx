import { useState } from "react";
import { useAuth } from "../../hooks/useAuth.ts";

interface LoginFormProps {
    onLoginSuccess: () => void;
}

export const LoginForm = ({ onLoginSuccess }: LoginFormProps) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const { login } = useAuth();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        if (!email.trim() || !password) {
            setError("Todos los campos son obligatorios.");
            return;
        }

        if (!emailRegex.test(email)) {
            setError("Ingresa un correo electrónico válido.");
            return;
        }

        if (password.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres.");
            return;
        }

        const credentials = {
            email: email.trim().toLowerCase(),
            password,
        };

        await login(credentials.email, credentials.password);

        onLoginSuccess();
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>

            {error && <p>{error}</p>}

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />

            <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
            />

            <button type="submit">
                Conectarse
            </button>
        </form>
    );
};