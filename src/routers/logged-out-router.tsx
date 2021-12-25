import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateAccount from '../pages/create-account';
import Login from '../pages/login';
import NotFound from '../pages/not-found';
const LoggedOutRouter = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/create-account" element={<CreateAccount />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Router>
	);
};

export default LoggedOutRouter;
