import React from 'react';
import { Helmet } from 'react-helmet-async';
import AppForm from '../../components/form/AppForm';
import * as Yup from 'yup'
import AppFormField from '../../components/form/AppFormField';
import AppFormSubmitButton from '../../components/form/AppFormSubmitButton';
import AppFormError from '../../components/form/AppFormError';
import { useMeQuery, useVerifyEmailMutation, VerifyEmailMutation } from '../../generated/graphql';
import VerifyEmailAnimation from '../../animations/components/VerifyEmail';
import { gql, useApolloClient } from '@apollo/client';
import { Navigate, useNavigate } from 'react-router-dom';
import { userLog } from '../../utils/swal/user-log';

interface IVerifyEmailForm{
    code:string;
}

const initialValues = {
    code:''
}

const validationSchema = Yup.object({
	code: Yup.string().uuid('Please enter a valid verification code.').required('Please enter the verification code sent to your email !'),
});

const VerifyEmail = () => {

    const client = useApolloClient()
    const navigate = useNavigate();
    const {data:userData} = useMeQuery()

    const onCompleted = async (d: VerifyEmailMutation) => {
        const { verifyEmail: { ok } } = d;
        if (ok && userData?.me.id) {
                    await userLog('success','Email verification done successfully!')
                    client.writeFragment({
                        id: `User:${userData.me.id}`,
                        fragment: gql`
          fragment VerifiedUser on User {
            verified
          }
        `,
                data: {
                    verified: true,
                },
            });
            navigate('/');
        }
	};


    const [verifyEmail,{data,loading}] = useVerifyEmailMutation({onCompleted})

    const handleSubmit = async(values: IVerifyEmailForm, actions: any) => {
        const { code } = values;
		const res = await verifyEmail({ variables: { input: { code } } });
		if (!res.data?.verifyEmail.error) {
			actions.resetForm();
		}
    }

    if (userData?.me.verified) {
        return <Navigate to="/"/>
    }

	return <div className="h-screen flex items-center flex-col mt-10 lg:mt-28">
			 <Helmet>
        <title>Verify Email | FoodiZone</title>
      </Helmet>
        <div className="w-full max-w-screen-sm flex flex-col px-5 items-center">
            <VerifyEmailAnimation height={150} width={150}/>
				<AppForm
					className="grid gap-3 mt-5 w-full mb-5"
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
				>
					<AppFormField fieldName="code" placeholder="Enter verification code" />
					<AppFormSubmitButton loading={loading} title="Verify" />
					{data?.verifyEmail?.error && <AppFormError errorMessage={data.verifyEmail.error}/>}
				</AppForm>
			</div>
		</div>
};

export default VerifyEmail;
