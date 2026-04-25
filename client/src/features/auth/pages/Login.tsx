import { loginSchema } from '../schemas/signup.schema'
import { loginFields } from '../config/signup.fields'
import AuthForm from '../components/AuthForm'

const Login = () => {
    const handleLogin = () => { }

    return (
        <AuthForm
            type={'login'}
            fields={loginFields}
            schema={loginSchema}
            onSubmit={handleLogin}
            buttonText="Log in"
        />
    )
}

export default Login