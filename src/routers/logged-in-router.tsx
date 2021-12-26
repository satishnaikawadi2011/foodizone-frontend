import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AppLoader from '../components/shared/AppLoader';
import Header from '../components/shared/Header';
import { useMeQuery, UserRole } from '../generated/graphql';
import Restaurants from '../pages/client/restaurants';
import NotFound from '../pages/not-found';
import EditProfile from '../pages/user/edit-profile';
import VerifyEmail from '../pages/user/verify-email';

export interface RouteType {
	path: string;
	element: JSX.Element;
}

const ClientRoutes: RouteType[] = [
	{ path: '/', element: <Restaurants /> }
];

const CommonUserRoutes: RouteType[] = [
	{ path: '/verify-email', element: <VerifyEmail /> },
	{ element: <EditProfile />, path: '/edit-profile' }
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
						return <Route key={route.path} path={route.path} element={route.element} />;
					})}
				{CommonUserRoutes.map((route) => {
					return <Route key={route.path} path={route.path} element={route.element} />;
				})}
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Router>
	);
};

export default LoggedInRouter;
