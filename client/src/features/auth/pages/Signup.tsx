import { signupSchema } from "../schemas/signup.schema";
import { signupFields } from "../config/signup.fields";
import AuthForm from "../components/AuthForm";

const Signup = () => {
    const handleSignup = () => {

    }

    return (
        <AuthForm
            type="signup"
            fields={signupFields}
            schema={signupSchema}
            onSubmit={handleSignup}
            buttonText="Sign Up"
        />
    )
}

export default Signup