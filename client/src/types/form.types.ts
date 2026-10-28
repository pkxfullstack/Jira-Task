import type {
	DefaultValues,
	FieldValues,
	Path,
	SubmitHandler,
} from "react-hook-form";
import type { ZodType } from "zod";

export type FieldConfig<T extends FieldValues> = {
	name: Path<T>;
	label: string;
	type: "text" | "email" | "password" | "select" | "textarea";
	options?: readonly {
		label: string;
		value: string;
	}[];
};

export type FormProps<T extends FieldValues> = {
	serverErrors?: Record<string, string>;
	schema: ZodType<T, T>;
	loading: boolean;
	buttonText: string;
	fields: readonly FieldConfig<T>[];
	defaultValues?: DefaultValues<T>;
	onSubmit: SubmitHandler<T>;
};
