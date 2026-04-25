// app/routes.tsx
import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "@/layouts/AuthLayout";
import AdminLayout from "@/layouts/AdminLayout";
import Login from "@/features/auth/pages/Login";
import Signup from "@/features/auth/pages/Signup";
import ProcessLog from "@/features/processing/ProcessLog";
import Dashboard from "@/features/dashboard/pages/Dashboard";

const router = createBrowserRouter([
    {
        element: <AuthLayout />,
        children: [
            { path: "/", element: <Login /> },
            { path: "/login", element: <Login /> },
            { path: "/signup", element: <Signup /> },
        ],
    },
    {
        element: <AdminLayout />,
        children: [
            { path: "/admin", element: <Dashboard /> },
            { path: "/admin/process", element: <ProcessLog /> },
        ],
    },
]);

export default router;