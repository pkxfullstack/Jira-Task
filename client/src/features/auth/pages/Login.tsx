import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useNavigate } from "react-router-dom";
import { showSnackbar } from "@/shared/ui/snackbar.slice";
import { useAppDispatch } from "../../../store/hooks";
import { type LoginRequest, useLoginMutation } from "../auth.api";
import { loginSuccess } from "../auth.slice";
import AuthForm from "../components/AuthForm";
import { loginFields } from "../config/signup.fields";
import { loginSchema } from "../signup.schema";

const Login = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [login, { isLoading, error }] = useLoginMutation();
	console.log(document.cookie);

	const handleLogin = async (data: LoginRequest) => {
		try {
			const response = await login(data).unwrap();

			dispatch(loginSuccess(response.user));
			navigate("/admin");
		} catch (error) {
			const err = error as FetchBaseQueryError;
			if ("data" in err) {
				dispatch(
					showSnackbar({
						message:
							(err.data as { message?: string })?.message ||
							"An error occurred",
						severity: "error",
					}),
				);
			}
		}
	};

	return (
		<AuthForm
			type={"login"}
			fields={loginFields}
			schema={loginSchema}
			onSubmit={handleLogin}
			buttonText="Log in"
			loading={isLoading}
			serverErrors={
				error && "data" in error
					? (error.data as Record<string, string>)
					: undefined
			}
		/>
	);
};

export default Login;
