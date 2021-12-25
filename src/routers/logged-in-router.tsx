import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AppLoader from '../components/shared/AppLoader';
import Header from '../components/shared/Header';
import { useMeQuery, UserRole } from '../generated/graphql';
import Restaurants from '../pages/client/restaurants';
import NotFound from '../pages/not-found';

export interface RouteType {
	path: string;
	element: JSX.Element;
}

const ClientRoutes: RouteType[] = [
	{ path: '/', element: <Restaurants /> }
];

const LoggedInRouter = () => {
	const { data, loading, error } = useMeQuery();

	if (!data || loading || error) {
		return (
			<div className="h-screen flex justify-center items-center">
				<AppLoader />
			</div>
		);
	}

	return (
		<Router>
			<Header />
			<Routes>
				{data.me.role === UserRole.Client &&
					ClientRoutes.map((route) => {
						return <Route path={route.path} element={route.element} />;
					})}
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Router>
	);
};

export default LoggedInRouter;
