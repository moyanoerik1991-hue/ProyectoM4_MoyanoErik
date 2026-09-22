import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.ts";

export const NavBar = () => {
    const { isAuthenticated, logout } = useAuth();

    return (
        <nav>
            <NavLink to="/">Inicio</NavLink>
            {" | "}
            <NavLink to="/tasks">Tareas</NavLink>
            {" | "}
            <NavLink to="/about">Acerca de</NavLink>

            {isAuthenticated && (
                <>
                    {" | "}
                    <button onClick={logout}>
                        Cerrar sesión
                    </button>
                </>
            )}
        </nav>
    );
};