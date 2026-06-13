import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form'
import Button from '@/shared/ui/Button/Button';
import Input from '@/shared/ui/Input/Input';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';
import { useEffect } from 'react';
import { applyServerErrors } from '@/shared/utils/form-error.util';

type FieldConfig = {
    name: string;
    label: string;
    type: string;
};

type Props = {
    serverErrors?: Record<string, string>;
    type: string;
    schema: any;
    loading: boolean;
    buttonText: string;
    fields: FieldConfig[];
    onSubmit: (data: any) => void;
};

const AuthForm = ({ type, fields, schema, onSubmit, buttonText, serverErrors, loading }: Props) => {
    const { control, handleSubmit, setError, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
        defaultValues: fields.reduce(
            (acc, field) => ({
                ...acc,
                [field.name]: "",
            }),
            {}
        ),
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

                <Button> {buttonText}{loading ? "..." : ""}</Button>
                <Box sx={{ textAlign: "center" }}>
                    {type === "login" ? "Don't have an Account? " : "Already have an Account? "}
                    <Link to={type === "login" ? "/signup" : "/login"}>{type === "login" ? "SignUp" : "Login"}</Link>
                </Box>
            </Box>
        </form>

    )
}

export default AuthForm