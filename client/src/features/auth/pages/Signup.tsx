import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { SignupRequest, ApiError } from "../auth.types";
import { showSnackbar } from "@/shared/ui/snackbar.slice";
import { signupFields } from "../config/signup.fields";
import { signupSchema } from "../signup.schema";
import { useSignupMutation } from "../auth.api";
import { useAppDispatch } from "@/store/hooks";
import AuthForm from "../components/AuthForm";

const Signup = () => {
    const [signup, { isLoading, error }] = useSignupMutation();
    const dispatch = useAppDispatch();

    const handleSignup = async (data: SignupRequest) => {
        try {
            const response = await signup(data).unwrap();
            if (response.success) {
                dispatch(showSnackbar({
                    message: response.message || "Signup successful!",
                    severity: "success",
                }));
            }
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
            type="signup"
            fields={signupFields}
            schema={signupSchema}
            onSubmit={handleSignup}
            buttonText="Sign Up"
            loading={isLoading}
            serverErrors={
                error && "data" in error ?
                    (error.data as ApiError)?.errors
                    : undefined
            }
        />
    )
}

export default Signup