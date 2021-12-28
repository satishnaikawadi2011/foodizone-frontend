import React from 'react';
import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { AppApolloProvider } from './apollo';
import { AppStripeProvider } from './stripe';

import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

ReactDOM.render(
	<React.StrictMode>
		<AppApolloProvider>
			<HelmetProvider>
				<AppStripeProvider>
					<App />
				</AppStripeProvider>
			</HelmetProvider>
		</AppApolloProvider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
