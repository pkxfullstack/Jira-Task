import { Alert, Snackbar } from "@mui/material";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/store/hooks";
import { hideSnackbar } from "../ui/snackbar.slice";

const AppSnackbar = () => {
	const { open, message, severity } = useSelector(
		(state: {
			snackbar: {
				open: boolean;
				message: string;
				severity: "success" | "error" | "warning" | "info";
			};
		}) => state.snackbar,
	);
	const dispatch = useAppDispatch();

	const handleClose = () => {
		dispatch(hideSnackbar());
	};

	return (
		<Snackbar
			anchorOrigin={{ vertical: "top", horizontal: "right" }}
			key={"top" + "right"}
			open={open}
			autoHideDuration={10000}
			onClose={handleClose}
		>
			<Alert
				onClose={handleClose}
				severity={severity}
				variant="filled"
				sx={{ width: "100%" }}
			>
				{message}
			</Alert>
		</Snackbar>
	);
};

export default AppSnackbar;
