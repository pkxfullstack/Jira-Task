import { zodResolver } from "@hookform/resolvers/zod";
import {
	Box,
	Button,
	FormControl,
	FormHelperText,
	InputLabel,
	MenuItem,
	Select,
} from "@mui/material";
import { useEffect } from "react";
import {
	Controller,
	type DefaultValues,
	type FieldValues,
	useForm,
} from "react-hook-form";
import Input from "@/shared/ui/Input/Input";
import { applyServerErrors } from "@/shared/utils/form-error.util";
import type { FormProps } from "@/types/form.types";

export function ReusableForm<T extends FieldValues>({
	fields,
	schema,
	onSubmit,
	buttonText,
	serverErrors,
	loading,
}: FormProps<T>) {
	const { control, handleSubmit, setError } = useForm<T>({
		resolver: zodResolver(schema),
		defaultValues: Object.fromEntries(
			fields.map(({ name }) => [name, ""]),
		) as DefaultValues<T>,
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
						render={({ field: controllerField, fieldState }) =>
							field.type === "select" ? (
								<FormControl>
									<InputLabel id={`${field.name}-label`}>
										{field.label}
									</InputLabel>
									<Select
										labelId={`${field.name}-label`}
										id={field.name}
										name={controllerField.name}
										value={controllerField.value ?? ""}
										label={field.label}
										onChange={controllerField.onChange}
										onBlur={controllerField.onBlur}
										inputRef={controllerField.ref}
										error={!!fieldState.error}
									>
										{field.options?.map((option) => (
											<MenuItem key={option.value} value={option.value}>
												{option.label}
											</MenuItem>
										))}
									</Select>
									{fieldState.error?.message && (
										<FormHelperText>{fieldState.error.message}</FormHelperText>
									)}
								</FormControl>
							) : (
								<Input
									{...controllerField}
									label={field.label}
									type={field.type}
									errorMessage={fieldState.error?.message}
								/>
							)
						}
					/>
				))}

				<Button variant="contained" loading={loading} type="submit">
					{buttonText}
				</Button>
			</Box>
		</form>
	);
}
