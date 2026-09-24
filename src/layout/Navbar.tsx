import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.ts";

export const NavBar = () => {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleAuthAction = async () => {
        if (isAuthenticated) {
            await logout();
            navigate("/");
            return;
        }

        navigate("/auth");
    };

    return (
        <nav>
            <NavLink to="/">Inicio</NavLink>
            {" | "}
            <NavLink to="/tasks">Tareas</NavLink>
            <button type="button" onClick={handleAuthAction}>
                {isAuthenticated ? "Cerrar sesión" : "Iniciar sesión"}
            </button>
        </nav>
    );
};