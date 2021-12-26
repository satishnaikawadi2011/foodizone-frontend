import React from 'react';
import { useParams } from 'react-router-dom';

type IParams = Record<'id', string | undefined>;

const RestaurantDetail = () => {
	const params = useParams<IParams>();
	return <div>Resturant Detail Page {params.id}</div>;
};

export default RestaurantDetail;
