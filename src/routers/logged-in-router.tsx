import React from 'react';
import AppLoader from '../components/shared/AppLoader';
import { useMeQuery } from '../generated/graphql';

const LoggedInRouter = () => {
	const { data, loading, error } = useMeQuery();

	if (!data || loading || error) {
		return (
			<div className="h-screen flex justify-center items-center">
				<AppLoader />
			</div>
		);
	}

	return <div>{data.me.role}</div>;
};

export default LoggedInRouter;
