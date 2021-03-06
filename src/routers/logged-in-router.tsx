import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AppLoader from '../components/shared/AppLoader';
import Header from '../components/shared/Header';
import SideDrawer from '../components/shared/SideDrawer';
import { useMeQuery, UserRole } from '../generated/graphql';
import Category from '../pages/client/category';
import Restaurant from '../pages/client/restaurant';
import Restaurants from '../pages/client/restaurants';
import Search from '../pages/client/search';
import Dashboard from '../pages/driver/dashboard';
import NotFound from '../pages/not-found';
import Order from '../pages/order';
import AddDish from '../pages/owner/add-dish';
import AddRestaurant from '../pages/owner/add-restaurant';
import MyRestaurants from '../pages/owner/my-restaurants';
import RestaurantDetail from '../pages/owner/restaurant-detail';
import Failure from '../pages/stripe/canceled';
import Success from '../pages/stripe/success';
import EditProfile from '../pages/user/edit-profile';
import VerifyEmail from '../pages/user/verify-email';

export interface RouteType {
	path: string;
	element: JSX.Element;
}

const ClientRoutes: RouteType[] = [
	{ path: '/', element: <Restaurants /> },
	{ path: '/search', element: <Search /> },
	{ path: '/category/:slug', element: <Category /> },
	{ path: '/restaurants/:id', element: <Restaurant /> }
];

const CommonUserRoutes: RouteType[] = [
	{ path: '/verify-email', element: <VerifyEmail /> },
	{ element: <EditProfile />, path: '/edit-profile' },
	{ path: '/orders/:id', element: <Order /> }
];

const OwnerRoutes: RouteType[] = [
	{ path: '/add-restaurant', element: <AddRestaurant /> },
	{ path: '/', element: <MyRestaurants /> },
	{ path: '/restaurants/:id', element: <RestaurantDetail /> },
	{ path: '/restaurants/:restaurantId/add-dish', element: <AddDish /> },
	{ path: '/success/:id', element: <Success /> },
	{ path: '/canceled', element: <Failure /> }
];

const DriverRoutes: RouteType[] = [
	{ path: '/', element: <Dashboard /> }
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
			<SideDrawer />
			<Routes>
				{data.me.role === UserRole.Client &&
					ClientRoutes.map((route) => {
						return <Route key={route.path} path={route.path} element={route.element} />;
					})}
				{data.me.role === UserRole.Owner &&
					OwnerRoutes.map((route) => {
						return <Route key={route.path} path={route.path} element={route.element} />;
					})}
				{data.me.role === UserRole.Delivery &&
					DriverRoutes.map((route) => {
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
