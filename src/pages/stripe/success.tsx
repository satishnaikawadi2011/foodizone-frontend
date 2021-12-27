import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const Success = () => {
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
