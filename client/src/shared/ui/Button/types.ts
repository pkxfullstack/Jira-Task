// shared/ui/Button/types.ts
export type ButtonVariant = "primary" | "secondary" | "danger";

export type ButtonSize = "sm" | "md" | "lg";

export interface CustomButtonProps {
	children: React.ReactNode;
	variant?: ButtonVariant;
	size?: ButtonSize;
	loading?: boolean;
	startIcon?: React.ReactNode;
	endIcon?: React.ReactNode;
	onClick?: () => void;
}
