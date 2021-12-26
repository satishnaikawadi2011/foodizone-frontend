import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { Restaurant } from '../../components/Restaurant';
import { useClientRestaurantsPageQuery } from '../../generated/graphql';

const Restaurants = () => {
	const [page, setPage] = useState(1);
	const [searchTerm, setSearchTerm] = useState('');
  const {data,loading} = useClientRestaurantsPageQuery({ variables: { input: { page, pageLength: 6 } } });
  const onNextPageClick = () => setPage((current) => current + 1);
  const onPrevPageClick = () => setPage((current) => current - 1);
  const navigate = useNavigate();
  const onSearchSubmit = () => {
    navigate({
      pathname: "/search",
      search: `?term=${searchTerm}`,
    });
  };
  return (
    <div>
      <Helmet>
        <title>Home | FoodiZone</title>
      </Helmet>
      <form
        onSubmit={onSearchSubmit}
        className="bg-gray-800 w-full py-40 flex items-center justify-center"
      >
			  <input
				  onChange={(e) => setSearchTerm(e.target.value)}
          name="searchTerm"
          type="Search"
          className="input rounded-md border-0 w-3/4 md:w-3/12"
          placeholder="Search restaurants..."
        />
      </form>
      {!loading && (
        <div className="max-w-screen-2xl pb-20 mx-10 mt-8">
          <div className="flex justify-around max-w-sm mx-auto ">
            {data?.allCategories.categories?.map((category) => (
              <Link key={category.id} to={`/category/${category.slug}`}>
                <div className="flex flex-col group items-center cursor-pointer">
                  <div
                    className=" w-16 h-16 bg-cover group-hover:bg-gray-100 rounded-full"
                    style={{ backgroundImage: `url(${category.img})` }}
                  ></div>
                  <span className="mt-1 text-sm text-center font-medium">
                    {category.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10">
            {data?.restaurants.results?.map((restaurant) => (
              <Restaurant
                key={restaurant.id}
                id={restaurant.id}
                coverImg={restaurant.coverImg}
                name={restaurant.name}
                categoryName={restaurant.category?.name}
              />
            ))}
          </div>
          <div className="grid grid-cols-3 text-center max-w-md items-center mx-auto mt-10">
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
              Page {page} of {data?.restaurants.totalPages}
            </span>
            {page !== data?.restaurants.totalPages ? (
              <button
                onClick={onNextPageClick}
                className="focus:outline-none font-medium text-2xl"
              >
                &rarr;
              </button>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Restaurants;
