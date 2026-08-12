import { Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useGetMeQuery } from "@/features/auth/auth.api";
import { loginSuccess } from "@/features/auth/auth.slice";
import Navbar from "@/shared/layout/Navbar";
import Sidebar from "@/shared/layout/Sidebar";
import { useAppDispatch } from "@/store/hooks";

const AdminLayout = () => {
	const dispatch = useAppDispatch();
	const [open, setOpen] = useState(true);
	const { data, isLoading, isError } = useGetMeQuery();

	useEffect(() => {
		if (data?.user) dispatch(loginSuccess(data.user));
	}, [data, dispatch]);

	if (isLoading) {
		return (
			<Box display="grid" sx={{ minHeight: "100vh", placeItems: "center" }}>
				<CircularProgress />
			</Box>
		);
	}

	if (isError || !data?.user) {
		return <Navigate to="/login" replace />;
	}

	return (
		<Box sx={{ display: "flex", height: "100vh" }}>
			<Sidebar open={open} />
			<Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
				<Navbar toggleSidebar={() => setOpen(!open)} open={open} />
				<Box sx={{ p: 3, flexGrow: 1, overflow: "auto" }}>
					<Outlet />
				</Box>
			</Box>
		</Box>
	);
};

export default AdminLayout;
