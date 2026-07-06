import type { FieldValues, Path, UseFormSetError } from "react-hook-form";

export const applyServerErrors = <T extends FieldValues>(
	setError: UseFormSetError<T>,
	errors?: Record<string, string>,
) => {
	if (!errors) return;

	Object.entries(errors).forEach(([field, message]) => {
		setError(field as Path<T>, {
			type: "server",
			message,
		});
	});
};
