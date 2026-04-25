import { Outlet, Navigate } from "react-router-dom";
import Sidebar from "@/shared/layout/Sidebar";
import Navbar from "@/shared/layout/Navbar";
import { Box } from "@mui/material";
import { useState } from "react";

const isAuthenticated = false;
const AdminLayout = () => {
    const [open, setOpen] = useState(true);
    // if (!isAuthenticated) {
    //     return <Navigate to="/login" replace />;
    // }

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