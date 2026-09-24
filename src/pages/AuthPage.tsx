import { useState } from "react";
import "../components/styles/AuthPage.css";
import { useLocation, useNavigate } from "react-router-dom";

import { LoginForm } from "../components/auth/LoginForm.tsx";
import { RegisterForm } from "../components/auth/RegisterForm.tsx";

interface LocationState {
    from?: {
        pathname: string;
    };
}

export const AuthPage = () => {
    const [mode, setMode] = useState<"login" | "register">(
        "login"
    );

    const location = useLocation();
    const navigate = useNavigate();

    const state = location.state as LocationState | null;

    const handleLoginSuccess = () => {
        navigate(
            state?.from?.pathname ?? "/",
            { replace: true }
        );
    };

    const handleRegisterSuccess = () => {
        navigate("/tasks", { replace: true });
    };

    return (
        <main className="auth-page">
            {mode === "login" ? (
                <div>
                    <LoginForm
                        onLoginSuccess={handleLoginSuccess}
                    />

                    <button
                        type="button"
                        onClick={() => setMode("register")}
                    >
                        Registrarse
                    </button>
                </div>
            ) : (
                <div>
                    <RegisterForm
                        onRegisterSuccess={handleRegisterSuccess}
                    />

                    <button
                        type="button"
                        onClick={() => setMode("login")}
                    >
                        Iniciar sesión
                    </button>
                </div>
            )}
        </main>
    );
};

