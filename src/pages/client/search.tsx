import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation, useNavigate } from 'react-router-dom';
import { Restaurant } from '../../components/Restaurant';
import AppLoader from '../../components/shared/AppLoader';
import { useSearchRestaurantLazyQuery } from '../../generated/graphql';

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('')
    	const [page, setPage] = useState(1);
  const onNextPageClick = () => setPage((current) => current + 1);
  const onPrevPageClick = () => setPage((current) => current - 1);
	const location = useLocation();
	const navigate = useNavigate();
	const [
		searchRestaurant,
		{ data, loading }
	] = useSearchRestaurantLazyQuery();
	useEffect(
		() => {
			const [
				_,
				query
            ] = location.search.split('?term=');
			if (!query) {
                return navigate('/');
			}
            setSearchTerm(query);
			searchRestaurant({
				variables:
					{
						input:
							{
								page,
                            query,
                                pageLength:6
							}
					}
			});
		},
		[
			navigate,
			location,
            searchRestaurant,
            page
		]
	);
	if (!data || loading) {
		return (
			<div className="h-screen flex justify-center items-center">
				<AppLoader />
			</div>
		);
	}
	return (
		<div>
			<Helmet>
				<title>Search | FoodiZone</title>
			</Helmet>
            <h1 className="font-semibold text-2xl ml-10 my-10">Showing {data.searchRestaurant.totalResults} results for "{searchTerm}"</h1>
            {!loading && (
        <div className="max-w-screen-2xl pb-20 mx-10 mt-8">
          <div className="grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10">
            {data?.searchRestaurant.restaurants?.map((restaurant) => (
              <Restaurant
                key={restaurant.id}
                id={restaurant.id}
                coverImg={restaurant.coverImg}
                name={restaurant.name}
                categoryName={restaurant.category?.name}
              />
            ))}
          </div>
          {data.searchRestaurant.totalResults! > 0 && <div className="grid grid-cols-3 text-center max-w-md items-center mx-auto mt-10">
            {page > 1 ? (
              <button
                onClick={onPrevPageClick}
                className="focus:outline-none font-medium text-2xl"
              >
                &larr;
              </button>
            ) : (
              <div></div>
            )}
            <span>
              Page {page} of {data?.searchRestaurant.totalPages}
            </span>
            {page !== data?.searchRestaurant.totalPages ? (
              <button
                onClick={onNextPageClick}
                className="focus:outline-none font-medium text-2xl"
              >
                &rarr;
              </button>
            ) : (
              <div></div>
            )}
          </div>}
        </div>
      )}
		</div>
	);
};

export default Search;
