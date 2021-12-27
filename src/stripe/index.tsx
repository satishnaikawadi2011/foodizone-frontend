import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { STRIPE_PUBLISHABLE_KEY } from '../constants';

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

export const AppStripeProvider: React.FC = ({ children }) => {
	return <Elements stripe={stripePromise}>{children}</Elements>;
};
