import React from 'react';
import { useForm } from 'react-hook-form';

interface ILoginForm {
	email: string;
	password: string;
}

const Login = () => {
	const {
		register,
		getValues,
		// errors,
		handleSubmit,
		formState
	} = useForm<ILoginForm>({
		mode: 'onChange'
	});

	return <div>Login Page</div>;
};

export default Login;
