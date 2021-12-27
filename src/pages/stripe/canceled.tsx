import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const Failure = () => {
	return (
		<div className="h-screen flex flex-col items-center justify-center">
			<Helmet>
				<title>Payment Failure | FoodiZone</title>
			</Helmet>
			<h2 className="font-semibold text-2xl mb-3">Payment Failed</h2>
			<h4 className="font-medium text-base mb-5">
				Payment has benn failed. SOmething went wrong. Sorry for your inconvinience.
			</h4>
			<Link className="hover:underline text-lime-600" to="/">
				Go back home &rarr;
			</Link>
		</div>
	);
};

export default Failure;
