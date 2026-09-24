import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.ts";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const location = useLocation();
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return children;
};