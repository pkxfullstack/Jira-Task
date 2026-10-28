import {
	Box,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Tooltip,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { sidebarItems } from "@/app/sidebar";

const Sidebar = ({ open }: { open: boolean }) => {
	const navigate = useNavigate();
	const location = useLocation();

	return (
		<Box
			sx={{
				width: open ? 240 : 70,
				transition: "width 0.3s",
				bgcolor: "#0f172a",
				color: "white",
				height: "100vh",
				overflow: "hidden",
			}}
		>
			<List>
				{sidebarItems.map((item) => {
					const isActive = location.pathname === item.path;
					const Icon = item.icon;

					return (
						<Tooltip
							key={item?.path}
							title={!open ? item.label : ""}
							placement="right"
						>
							<ListItemButton
								key={item.path}
								onClick={() => navigate(item.path)}
								sx={{
									bgcolor: isActive ? "#1e293b" : "transparent",
									justifyContent: open ? "initial" : "center",
								}}
							>
								<ListItemIcon
									sx={{
										color: "white",
										minWidth: 0,
										mr: 0.5,
									}}
								>
									<Icon />
								</ListItemIcon>

								{open && <ListItemText primary={item.label} />}
							</ListItemButton>
						</Tooltip>
					);
				})}
			</List>
		</Box>
	);
};

export default Sidebar;
