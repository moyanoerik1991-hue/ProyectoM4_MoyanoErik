import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NavBar } from "./layout/Navbar.tsx";
import { HomePage } from "./pages/HomePage.tsx";
import { AuthPage } from "./pages/AuthPage.tsx";
import { TaskPage } from "./pages/TaskPage.tsx";

import { ProtectedRoute } from "./components/auth/ProtectedRoute.tsx";
import { PublicOnlyRoute } from "./components/auth/PublicOnlyRoute.tsx";

export const App = () => {
    return (
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/auth" element={<PublicOnlyRoute><AuthPage /></PublicOnlyRoute>} />
                <Route path="/tasks" element={<ProtectedRoute><TaskPage /></ProtectedRoute>} />
            </Routes>
        </BrowserRouter>
    );
};