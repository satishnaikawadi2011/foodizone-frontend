import { useReactiveVar } from '@apollo/client';
import React from 'react';
import { isLoggedInVar } from './apollo';
import LoggedInRouter from './routers/logged-in-router';
import LoggedOutRouter from './routers/logged-out-router';

function App() {
	const isLoggedIn = useReactiveVar(isLoggedInVar);
	const component =
		isLoggedIn ? <LoggedInRouter /> :
		<LoggedOutRouter />;

	return component;
}

export default App;
