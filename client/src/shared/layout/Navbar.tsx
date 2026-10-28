import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import {
	AppBar,
	Avatar,
	Box,
	IconButton,
	Menu,
	MenuItem,
	Toolbar,
	Tooltip,
	Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi, useLogoutMutation } from "@/features/auth/auth.api";
import { logout as clearAuth } from "@/features/auth/auth.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Navbar = ({
	toggleSidebar,
	open,
}: {
	toggleSidebar: () => void;
	open: boolean;
}) => {
	const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
	const [logoutRequest] = useLogoutMutation();
	const user = useAppSelector((state) => state.auth.user);
	console.log(user);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleSettingClick = async (setting: string) => {
		setAnchorElUser(null);

		if (setting === "Logout") {
			try {
				await logoutRequest().unwrap();
			} finally {
				dispatch(clearAuth());
				dispatch(authApi.util.resetApiState());
				navigate("/login", { replace: true });
			}
		}
	};

	return (
		<AppBar position="static" sx={{ bgcolor: "#1e293b" }}>
			<Toolbar>
				<IconButton onClick={toggleSidebar} sx={{ color: "inherit" }}>
					{open ? <MenuIcon /> : <CloseIcon />}
				</IconButton>
				<Typography variant="h6">Jira Task App</Typography>

				<Box sx={{ flexGrow: 1 }} />
				<Tooltip title="Open settings">
					<IconButton
						onClick={(event) => setAnchorElUser(event.currentTarget)}
						sx={{ p: 0 }}
					>
						<Avatar alt={user?.name} src={user?.profileImageUrl} />
					</IconButton>
				</Tooltip>
				<Menu
					sx={{ mt: "45px" }}
					anchorEl={anchorElUser}
					open={Boolean(anchorElUser)}
					onClose={() => setAnchorElUser(null)}
				>
					{settings.map((setting) => (
						<MenuItem
							key={setting}
							onClick={() => void handleSettingClick(setting)}
						>
							<Typography>{setting}</Typography>
						</MenuItem>
					))}
				</Menu>
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
