import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import { useStripe } from '@stripe/react-stripe-js'
import {Line} from 'react-chartjs-2'

import { Dish } from '../../components/Dish';
import { PROMOTION_PRICE } from '../../constants';
import { useCreateCheckoutSessionForRestaurantPromotionMutation, useMeQuery, useMyRestaurantQuery, usePendingOrdersSubscription } from '../../generated/graphql';
import AppLoader from '../../components/shared/AppLoader';

type Params = {
	id:string;
}


export const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Sales',
    },
  },
};


const RestaurantDetail = () => {
	const { id } = useParams<Params>();
	const { data } = useMyRestaurantQuery({ variables: { input: { id: id! } } });
	const { data: userData } = useMeQuery();
	const { data: subscriptionData } = usePendingOrdersSubscription();
	const [createCheckoutSession,{loading}] = useCreateCheckoutSessionForRestaurantPromotionMutation()

	const navigate = useNavigate();
	const stripe = useStripe();

	  useEffect(() => {
    if (subscriptionData?.pendingOrders.id) {
      navigate(`/orders/${subscriptionData.pendingOrders.id}`);
    }
	  }, [subscriptionData, navigate]);
	
	const handleBuyPromotion = async() => {
		try {
			const res = await createCheckoutSession({
				variables: {
					input: {
						customer_email: userData?.me.email!,
            line_items: [{ quantity: 1, price_data: { currency: 'inr', unit_amount: PROMOTION_PRICE * 100, product_data: { description: 'This is the purchase request for the one week restaurant promotion.', images: ['http://res.cloudinary.com/dccarvd4z/image/upload/v1640608301/oryo2copqq8oajf94rna.png'], name: 'One Week Restaurant Promotion' } } }],
            restaurant_id:id!
					}
				}
			})
      if (res.data?.createCheckoutSessionForRestaurantPromotion.error) {
        console.log(res.data?.createCheckoutSessionForRestaurantPromotion.error);
        return;
      }
      const sessionId = res.data?.createCheckoutSessionForRestaurantPromotion.session_id!;
      console.log(sessionId)
			const { error} = await stripe!.redirectToCheckout({
				sessionId
			})
			console.log(error)
		} catch (error) {
			console.log(error)
		}
  }
  
    if (loading || !data) {
    	return (
			<div className="h-screen flex justify-center items-center">
				<AppLoader />
			</div>
		);
  }

	return  (<div>
      <Helmet>
        <title>
          {data?.myRestaurant.restaurant?.name || "Loading..."} | FoodiZone
        </title>
      </Helmet>
      <div className="checkout-container"></div>
      <div
        className="  bg-gray-700  py-28 bg-center bg-cover"
        style={{
          backgroundImage: `url(${data?.myRestaurant.restaurant?.coverImg})`,
        }}
      ></div>
      <div className="container mt-10">
        <h2 className="text-4xl font-medium mb-10">
          {data?.myRestaurant.restaurant?.name || "Loading..."}
        </h2>
        <Link
          to={`/restaurants/${id}/add-dish`}
          className=" mr-8 text-white bg-gray-800 py-3 px-10"
        >
          Add Dish &rarr;
        </Link>
      <button
        disabled={!stripe}
          onClick={handleBuyPromotion}
          className=" cursor-pointer text-white bg-lime-700 py-3 px-10"
        >
          Buy Promotion &rarr;
        </button>
        <div className="mt-10">
          {data?.myRestaurant.restaurant?.menu.length === 0 ? (
            <h4 className="text-xl mb-5">Please upload a dish!</h4>
          ) : (
            <div className="grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10">
              {data?.myRestaurant.restaurant?.menu.map((dish, index) => (
				  <Dish
					  photo={dish.photo!}
                  key={index}
                  name={dish.name}
                  description={dish.description}
                  price={dish.price}
                />
              ))}
            </div>
          )}
        </div>
        <div className="mt-20 mb-10">
          <div className="  mt-10">
          <Line options={chartOptions} data={{ labels: data?.myRestaurant.restaurant?.orders.map((order) => order.createdAt),datasets:[{data:data?.myRestaurant.restaurant?.orders.map((order) => order.total),label:'Sales',      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',}] }} />;
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;
