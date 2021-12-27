import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import AppLoader from '../../components/shared/AppLoader';
import { useCreatePaymentMutation } from '../../generated/graphql';

type Params = {
	id: string;
};

const Success = () => {
	const params = useParams<Params>();
	const [
		createPayment,
		{ loading }
	] = useCreatePaymentMutation();

	useEffect(
		() => {
			if (params.id) {
				createPayment({ variables: { input: { restaurantId: params.id } } });
			}
		},
		[
			params,
			createPayment
		]
	);

	if (loading) {
		return (
			<div className="h-screen flex justify-center items-center">
				<AppLoader />
			</div>
		);
	}

	return (
		<div className="h-screen flex flex-col items-center justify-center">
			<Helmet>
				<title>Payment Success | FoodiZone</title>
			</Helmet>
			<h2 className="font-semibold text-2xl mb-3">Thank you for your promotion request.</h2>
			<h4 className="font-medium text-base mb-5">
				We are currently processing your request. Your restaurant will be promoted soon. We will send you a
				confirmation email shortly.
			</h4>
			<Link className="hover:underline text-lime-600" to="/">
				Go back home &rarr;
			</Link>
		</div>
	);
};

export default Success;
