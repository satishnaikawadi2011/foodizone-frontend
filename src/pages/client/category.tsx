import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { Restaurant } from '../../components/Restaurant';
import AppLoader from '../../components/shared/AppLoader';
import { useCategoryQuery } from '../../generated/graphql';

type CategoryParams = {
	slug: string;
};

const Category = () => {
    const [page, setPage] = useState(1);
      const onNextPageClick = () => setPage((current) => current + 1);
  const onPrevPageClick = () => setPage((current) => current - 1);
    const { slug } = useParams<CategoryParams>();
    const { data, loading } = useCategoryQuery({ variables: { input: { slug: slug as string, page, pageLength: 6 } } });
    if (loading) {
        return (
            <div className="h-screen flex justify-center items-center">
                <AppLoader />
            </div>
        );
    }
    return <div>
      <Helmet>
        <title>{data?.category.category?.name} | FoodiZone</title>
      </Helmet>
      <div
        className="bg-gray-100 w-full py-10 flex items-center justify-between px-20"
      >
            <h1 className='text-4xl font-semibold'>{data?.category.category?.name}</h1>
            <img src={data?.category.category?.img} alt={data?.category.category?.name} />
      </div>
      {!loading && (
        <div className="max-w-screen-2xl pb-20 mx-10 mt-8">
          <div className="grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10">
            {data?.category.restaurants?.map((restaurant) => (
              <Restaurant
                key={restaurant.id}
                id={restaurant.id}
                coverImg={restaurant.coverImg}
                name={restaurant.name}
                categoryName={restaurant.category?.name}
              />
            ))}
          </div>
            {data?.category.totalResults! > 0 &&      <div className="grid grid-cols-3 text-center max-w-md items-center mx-auto mt-10">
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
              Page {page} of {data?.category.totalPages}
            </span>
            {page !== data?.category.totalPages ? (
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
}
export default Category;
