import { useLoginMutation, type LoginRequest } from '../auth.api';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { showSnackbar } from '@/shared/ui/snackbar.slice';
import { useAppDispatch } from '../../../store/hooks';
import { loginFields } from '../config/signup.fields'
import { loginSchema } from '../signup.schema'
import AuthForm from '../components/AuthForm'
import { loginSuccess } from '../auth.slice';

const Login = () => {
    const [login, { isLoading, error }] = useLoginMutation();
    const dispatch = useAppDispatch();

    const handleLogin = async (data: LoginRequest) => {
        try {
            const response = await login(data).unwrap();

            dispatch(
                loginSuccess({
                    user: response.user,
                    token: response.token,
                })
            );
        } catch (error) {
            const err = error as FetchBaseQueryError;
            if ("data" in err) {
                dispatch(showSnackbar({
                    message: (err.data as { message?: string })?.message || "An error occurred",
                    severity: "error",
                }));
            }
        }
    };

    return (
        <AuthForm
            type={'login'}
            fields={loginFields}
            schema={loginSchema}
            onSubmit={handleLogin}
            buttonText="Log in"
            loading={isLoading}
            serverErrors={error && "data" in error ? (error.data as Record<string, string>) : undefined}
        />
    )
}

export default Login