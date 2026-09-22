import { useState } from "react";
import { useAuth } from "../../hooks/useAuth.ts";

interface RegisterFormProps {
    onRegisterSuccess: () => void;
}

export const RegisterForm = ({ onRegisterSuccess }: RegisterFormProps) => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const { register } = useAuth();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        if (!userName.trim() || !email.trim() || !password || !confirmPassword) {
            setError("Todos los campos son obligatorios.");
            return;
        }

        if (userName.trim().length < 3) {
            setError("El nombre de usuario debe tener al menos 3 caracteres.");
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

        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        const userData = {
            userName: userName.trim(),
            email: email.trim().toLowerCase(),
            password,
        };

        await register(
            userData.userName,
            userData.email,
            userData.password
        );

        onRegisterSuccess();
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Registrarse</h2>

            {error && <p>{error}</p>}

            <input
                type="text"
                placeholder="Usuario"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
            />

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

            <input
                type="password"
                placeholder="Confirmar Contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
            />

            <button type="submit">
                Registrarse
            </button>
        </form>
    );
};