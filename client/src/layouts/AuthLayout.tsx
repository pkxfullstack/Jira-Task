import { Grid, Box, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    return (
        <Grid container sx={{ height: "100vh" }}>

            {/* LEFT SIDE (Branding) */}
            <Grid size={{ xs: 0, md: 6 }}
                sx={{
                    display: { xs: "none", md: "flex" },
                    backgroundColor: "#0f172a",
                    color: "white",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    p: 4,
                }}
            >
                <Typography variant="h4" fontWeight="bold">
                    Jira Process App
                </Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                    Track, Analyze & Optimize your workflows
                </Typography>
            </Grid>

            {/* RIGHT SIDE (FORM) */}
            <Grid
                size={{ xs: 12, md: 6 }}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    p: 3,
                }}
            >
                <Box sx={{ width: 360 }}>
                    <Outlet />
                </Box>
            </Grid>
        </Grid >
    );
};

export default AuthLayout;