import { AppBar, Toolbar, Typography, Box, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from '@mui/icons-material/Close';

const Navbar = ({ toggleSidebar, open }: { toggleSidebar: () => void, open: boolean }) => {
    return (
        <AppBar position="static" sx={{ bgcolor: "#1e293b" }}>
            <Toolbar>
                <IconButton onClick={toggleSidebar} sx={{ color: "inherit" }}>
                    {open ? <MenuIcon /> : <CloseIcon />}
                </IconButton>
                <Typography variant="h6">Jira Task App</Typography>

                <Box sx={{ flexGrow: 1 }} />

                <Typography variant="body2">Prem</Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;