import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.ts";

interface PublicOnlyRouteProps {
    children: React.ReactNode;
}

export const PublicOnlyRoute = ({
    children,
}: PublicOnlyRouteProps) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return null;
    }

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return children;
};