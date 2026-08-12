// app/routes.tsx
import { createBrowserRouter } from "react-router-dom";
import Login from "@/features/auth/pages/Login";
import Signup from "@/features/auth/pages/Signup";
import Dashboard from "@/features/dashboard/pages/Dashboard";
import ProcessLog from "@/features/processing/ProcessLog";
import AdminLayout from "@/layouts/AdminLayout";
import AuthLayout from "@/layouts/AuthLayout";
import Task from "@/features/tasks/Task";
import User from "@/features/users/User";

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
			{ path: "/admin/tasks", element: <Task /> },
			{ path: "/admin/users", element: <User /> },
		],
	},
]);

export default router;
