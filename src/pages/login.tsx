import React from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import AppForm from '../components/form/AppForm';
import AppFormField from '../components/form/AppFormField';
import AppFormSubmitButton from '../components/form/AppFormSubmitButton';

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
	const handleSubmit = () => {};

	return (
		<div className="h-screen flex items-center flex-col mt-10 lg:mt-28">
			<div className="w-full max-w-screen-sm flex flex-col px-5 items-center">
				<AppForm
					className="grid gap-3 mt-5 w-full mb-5"
					initialValues={initialValues}
					validationSchema={loginSchema}
					onSubmit={handleSubmit}
				>
					<AppFormField fieldName="email" placeholder="Enter your email" />
					<AppFormField fieldName="password" placeholder="Enter your password" type="password" />
					{/* <AppErrorMessage visible={!!error} errorMessage={error?.message as any} /> */}

					<AppFormSubmitButton title="Login" />
				</AppForm>
			</div>
		</div>
	);
};

export default Login;
