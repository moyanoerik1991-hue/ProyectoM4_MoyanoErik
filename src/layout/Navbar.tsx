import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.ts";
import "../components/styles/Navbar.css";

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
        <header className="navbar">
            <div className="navbar__container">
                <nav className="navbar__links">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `navbar__link ${isActive ? "navbar__link--active" : ""}`
                        }
                    >
                        Home
                    </NavLink>
                    <span className="navbar__separator">|</span>
                    <NavLink
                        to="/tasks"
                        className={({ isActive }) =>
                            `navbar__link ${isActive ? "navbar__link--active" : ""}`
                        }
                    >
                        Tareas
                    </NavLink>
                </nav>

                <div className="navbar__actions">
                    <button
                        type="button"
                        className="navbar__button"
                        onClick={handleAuthAction}
                    >
                        {isAuthenticated ? "Cerrar sesión" : "Iniciar sesión"}
                    </button>
                </div>
            </div>
        </header>
    );
};