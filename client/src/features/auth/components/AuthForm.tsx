import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import { useEffect } from "react";
import {
	Controller,
	type DefaultValues,
	type FieldValues,
	type Path,
	type SubmitHandler,
	useForm,
} from "react-hook-form";
import { Link } from "react-router-dom";
import type { ZodType } from "zod";
import Button from "@/shared/ui/Button/Button";
import Input from "@/shared/ui/Input/Input";
import { applyServerErrors } from "@/shared/utils/form-error.util";

type FieldConfig<T extends FieldValues> = {
	name: Path<T>;
	label: string;
	type: string;
};

type Props<T extends FieldValues> = {
	serverErrors?: Record<string, string>;
	type: string;
	schema: ZodType<T, T>;
	loading: boolean;
	buttonText: string;
	fields: readonly FieldConfig<T>[];
	onSubmit: SubmitHandler<T>;
};

const AuthForm = <T extends FieldValues>({
	type,
	fields,
	schema,
	onSubmit,
	buttonText,
	serverErrors,
	loading,
}: Props<T>) => {
	const defaultValues = fields.reduce<Record<string, string>>(
		(values, field) => {
			values[field.name] = "";
			return values;
		},
		{},
	) as DefaultValues<T>;

	const { control, handleSubmit, setError } = useForm<T>({
		resolver: zodResolver(schema),
		defaultValues,
	});

	useEffect(() => {
		applyServerErrors(setError, serverErrors);
	}, [serverErrors, setError]);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Box display="flex" flexDirection="column" gap={2}>
				{fields.map((field) => (
					<Controller
						key={field.name}
						name={field.name}
						control={control}
						render={({ field: controllerField, fieldState }) => (
							<Input
								{...controllerField}
								label={field.label}
								type={field.type}
								errorMessage={fieldState.error?.message}
							/>
						)}
					/>
				))}

				<Button loading={loading}>{buttonText}</Button>
				<Box sx={{ textAlign: "center" }}>
					{type === "login"
						? "Don't have an Account? "
						: "Already have an Account? "}
					<Link to={type === "login" ? "/signup" : "/login"}>
						{type === "login" ? "SignUp" : "Login"}
					</Link>
				</Box>
			</Box>
		</form>
	);
};

export default AuthForm;
