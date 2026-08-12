import MuiButton from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import type { CustomButtonProps } from "./types";

const variantMap = {
	primary: "contained",
	secondary: "outlined",
	danger: "contained",
} as const;

const colorMap = {
	primary: "primary",
	secondary: "secondary",
	danger: "error",
} as const;

const sizeMap = {
	sm: "small",
	md: "medium",
	lg: "large",
} as const;

const Button = ({
	children,
	variant = "primary",
	size = "md",
	loading = false,
	startIcon,
	endIcon,
	onClick,
}: CustomButtonProps) => {
	return (
		<MuiButton
			variant={variantMap[variant]}
			color={colorMap[variant]}
			size={sizeMap[size]}
			disabled={loading}
			startIcon={!loading ? startIcon : undefined}
			endIcon={!loading ? endIcon : undefined}
			onClick={onClick}
			type="submit"
		>
			{loading ? <CircularProgress size={20} color="inherit" /> : children}
		</MuiButton>
	);
};

export default Button;
