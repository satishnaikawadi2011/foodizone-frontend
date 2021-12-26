import React from 'react';
import { useEditProfileMutation, useMeQuery } from '../../generated/graphql';
import * as Yup from 'yup'
import { Helmet } from 'react-helmet-async';
import AppForm from '../../components/form/AppForm';
import AppFormField from '../../components/form/AppFormField';
import AppFormSubmitButton from '../../components/form/AppFormSubmitButton';
import AppFormError from '../../components/form/AppFormError';
import { gql, useApolloClient } from '@apollo/client';
import { userLog } from '../../utils/swal/user-log';

interface IFormProps {
  email?: string;
  password?: string;
}

const validationSchema = Yup.object({
    email: Yup.string().email("Please enter a valid email."),
    password:Yup.string()
			.min(6, 'Password should be at least 6 characters long.')
			.max(12, 'Password should be less than 13 characters long.')
});

const EditProfile = () => {
    
    const { data: userData } = useMeQuery()
    const client = useApolloClient();
    const [editProfile, {  data,loading }] = useEditProfileMutation()
    
    const initialValues: IFormProps = {
        email: userData?.me.email,
        password:''
    }
    const handleSubmit = async (values: IFormProps, actions: any) => {
		const { email, password } = values;
        const res = await editProfile({ variables: { input: { ...(password !== "" && { password }), email } } });
        if (res?.data?.editProfile.ok && userData) {
            const { me: { email: prevEmail,id } } = userData;
            const newEmail = email;
            if (prevEmail !== newEmail) {
                 client.writeFragment({
          id: `User:${id}`,
          fragment: gql`
            fragment EditedUser on User {
              verified
              email
            }
          `,
          data: {
            email: newEmail,
            verified: false,
          },
        });
            }
            await userLog('toast','Profile updated successfully !')
        }
		
	};

	return <div className="mt-52 flex flex-col justify-center items-center">
			 <Helmet>
        <title>Edit Profile | FoodiZone</title>
      </Helmet>
				<h4 className="ont-semibold text-2xl mb-3">Edit Profile</h4>
				<AppForm
					className="grid max-w-screen-sm gap-3 mt-5 w-full mb-5"
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
				>
					<AppFormField fieldName="email" placeholder="Enter your email" />
					<AppFormField fieldName="password" placeholder="Enter your password" type="password" />
					<AppFormSubmitButton loading={loading} title="Save Profile" />
					{data?.editProfile?.error && <AppFormError errorMessage={data.editProfile.error}/>}
				</AppForm>
			</div>
};

export default EditProfile;
