import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NavBar } from "./layout/Navbar.tsx";
import { TaskPage } from "./pages/TaskPage.tsx"
import { HomePage } from "./pages/HomePage.tsx";
import { AboutPage } from "./pages/AboutPage.tsx";
import { useAuth } from "./hooks/useAuth.ts";
import { ProtectedRoute } from "./components/auth/ProtectedRoute.tsx";



export const App = () => {
    const { isAuthenticated } = useAuth();
    console.log("Estado de autenticación:", isAuthenticated);
    return (
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/tasks" element={<ProtectedRoute><TaskPage /></ProtectedRoute>} />
                <Route path="/about" element={<AboutPage />} />
            </Routes>
        </BrowserRouter>
    );
}
