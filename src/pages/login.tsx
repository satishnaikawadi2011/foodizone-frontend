import * as Yup from 'yup';
import AppForm from '../components/form/AppForm';
import AppFormField from '../components/form/AppFormField';
import AppFormSubmitButton from '../components/form/AppFormSubmitButton';
import { LoginMutation, useLoginMutation } from '../generated/graphql';
import { Link } from 'react-router-dom';
import foodiLogo from '../images/logo.svg';
import AppFormError from '../components/form/AppFormError';
import {Helmet} from 'react-helmet-async'
import  authStorage from '../utils/storage/auth'
import { authTokenVar, isLoggedInVar } from '../apollo';

interface ILoginForm {
	email: string;
	password: string;
}

const initialValues: ILoginForm = {
	email: '',
	password: ''
};

const loginSchema = Yup.object({
	email: Yup.string().email('Please enter a valid email.').required('Email is required field.').min(3),
	password:
		Yup.string()
			.required('Password is required field.')
			.min(6, 'Password should be at least 6 characters long.')
			.max(12, 'Password should be less than 13 characters long.')
});

const Login = () => {
	const onCompleted = (data: LoginMutation) => {
		const { login: { ok, token } } = data;
		if (ok && token) {
			console.log(token)
			authStorage.set({ token });
			  authTokenVar(token);
			  isLoggedInVar(true);
		}
	};

	const [
		login,
		{ data, loading }
	] = useLoginMutation({ onCompleted });

	const handleSubmit = async (values: ILoginForm, actions: any) => {
		const { email, password } = values;
		const res = await login({ variables: { input: { password, email } } });
		if (!res.data?.login.error) {
			actions.resetForm();
		}
	};

	return (
		<div className="h-screen flex items-center flex-col mt-10 lg:mt-28">
			 <Helmet>
        <title>Login | FoodiZone</title>
      </Helmet>
			<div className="w-full max-w-screen-sm flex flex-col px-5 items-center">
				<img src={foodiLogo} className="w-52 mb-10" alt="Nuber Eats" />
				<h4 className="w-full font-medium text-left text-3xl mb-5">Welcome back</h4>
				<AppForm
					className="grid gap-3 mt-5 w-full mb-5"
					initialValues={initialValues}
					validationSchema={loginSchema}
					onSubmit={handleSubmit}
				>
					<AppFormField fieldName="email" placeholder="Enter your email" />
					<AppFormField fieldName="password" placeholder="Enter your password" type="password" />
					<AppFormSubmitButton loading={loading} title="Login" />
					{data?.login?.error && <AppFormError errorMessage={data.login.error}/>}
				</AppForm>
				<div>
					New to FoodiZone?{' '}
					<Link to="/create-account" className="text-lime-600 hover:underline">
						Create an Account
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;
