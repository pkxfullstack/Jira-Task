import type { FieldValues, Path, UseFormSetError } from "react-hook-form";

export const applyServerErrors = <T extends FieldValues>(
	setError: UseFormSetError<T>,
	response?: {
		errors?: Record<string, string>;
	},
) => {
	if (!response?.errors) return;

	Object.entries(response?.errors).forEach(([field, message]) => {
		setError(field as Path<T>, {
			type: "server",
			message,
		});
	});
};
