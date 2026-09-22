import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { LoginForm } from "../components/auth/LoginForm.tsx";
import { RegisterForm } from "../components/auth/RegisterForm.tsx";

interface LocationState {
    from?: {
        pathname: string;
    };
}

export const HomePage = () => {
    const [mode, setMode] = useState<"login" | "register">("login");

    const location = useLocation();
    const navigate = useNavigate();

    const state = location.state as LocationState | null;

    const toRegister = () => {
        setMode("register");
    };

    const toLogin = () => {
        setMode("login");
    };

    const handleLoginSuccess = () => {
        navigate(state?.from?.pathname ?? "/");
    };

    const handleRegisterSuccess = () => {
        navigate(state?.from?.pathname ?? "/");
    };

    return (
        <div>
            <h1>Home Page</h1>

            {mode === "login" ? (
                <div>
                    <LoginForm onLoginSuccess={handleLoginSuccess} />
                    <button onClick={toRegister}>
                        Registrarse
                    </button>
                </div>
            ) : (
                <div>
                    <RegisterForm onRegisterSuccess={handleRegisterSuccess} />
                    <button onClick={toLogin}>
                        Conectarse
                    </button>
                </div>
            )}
        </div>
    );
};

