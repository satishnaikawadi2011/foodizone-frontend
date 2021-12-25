import * as Yup from 'yup';
import AppForm from '../components/form/AppForm';
import AppFormField from '../components/form/AppFormField';
import AppFormSubmitButton from '../components/form/AppFormSubmitButton';
import { CreateAccountMutation, useCreateAccountMutation,  UserRole } from '../generated/graphql';
import { Link,useNavigate } from 'react-router-dom';
import foodiLogo from '../images/logo.svg';
import AppFormError from '../components/form/AppFormError';
import {Helmet} from 'react-helmet-async'
import AppFormSelectField, { OptionType } from '../components/form/AppFormSelectField';
import { userLog } from '../utils/swal/user-log';

interface ISignupForm {
	email: string;
	password: string;
	role: UserRole;
}

const roles: OptionType[] = Object.keys(UserRole).map(r => ({ label: r, value: r })); 

const initialValues: ISignupForm = {
	email: '',
	password: '',
	role:UserRole.Client
};

const signupSchema = Yup.object({
	email: Yup.string().email('Please enter a valid email.').required('Email is required field.').min(3),
	password:
		Yup.string()
			.required('Password is required field.')
			.min(6, 'Password should be at least 6 characters long.')
			.max(12, 'Password should be less than 13 characters long.'),
	role:Yup.string().required("Please select the appropriate role for your account.")
});

const CreateAccount = () => {

	const navigate = useNavigate();

	const onCompleted = async(data: CreateAccountMutation) => {
		const { createAccount: { ok } } = data;
		if (ok) {
			await userLog('success','Account created successfully , please login !')
			navigate('/login');
		}
	};

	const [
		createAccount,
		{ data, loading }
	]=useCreateAccountMutation({ onCompleted });

	const handleSubmit = async (values: ISignupForm, actions: any) => {
		const { email, password,role } = values;
		const res = await createAccount({ variables: { input: { password, email,role } } });
		if (!res.data?.createAccount.error) {
			actions.resetForm();
		}
	};

	return (
		<div className="h-screen flex items-center flex-col mt-10 lg:mt-28">
			 <Helmet>
        <title>Create An Account | FoodiZone</title>
      </Helmet>
			<div className="w-full max-w-screen-sm flex flex-col px-5 items-center">
				<img src={foodiLogo} className="w-52 mb-10" alt="Nuber Eats" />
				<h4 className="w-full font-medium text-left text-3xl mb-5">Welcome to FoodiZone , Let's get started !</h4>
				<AppForm
					className="grid gap-3 mt-5 w-full mb-5"
					initialValues={initialValues}
					validationSchema={signupSchema}
					onSubmit={handleSubmit}
				>
					<AppFormField fieldName="email" placeholder="Enter your email" />
					<AppFormField fieldName="password" placeholder="Enter your password" type="password" />
					<AppFormSelectField fieldName="role" options={roles} placeholder="Select account role" />
					<AppFormSubmitButton loading={loading} title="Create Account" />
					{data?.createAccount?.error && <AppFormError errorMessage={data.createAccount.error}/>}
				</AppForm>
				<div>
					Already use FoodiZone?{' '}
					<Link to="/login" className="text-lime-600 hover:underline">
						Sign In
					</Link>
				</div>
			</div>
		</div>
	);
};

export default CreateAccount;
