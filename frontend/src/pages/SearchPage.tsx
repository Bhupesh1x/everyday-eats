import { useEffect } from "react";
import { useParams } from "react-router-dom";

import Layout from "../layouts/Layout";

import { useSearch } from "../features/search/queries";

import { Loader } from "../components/Loader";
import { SearchResultsInfo } from "../components/search/SearchResultsInfo";
import { SearchRestaurantCard } from "../components/search/SearchRestaurantCard";

function SearchPage() {
  const params = useParams();

  const { data: results, isLoading, isError } = useSearch(params.city);

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
      });
    };

    scrollToTop();
  }, []);

  if (isLoading) {
    return (
      <Layout>
        <Loader />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="h-full">
        {isError || !params.city ? (
          <p className="text-center text-2xl my-10">No restaurant found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-5 container py-4">
            <div>Insert cuisines here</div>

            <div>
              <SearchResultsInfo
                city={params.city}
                total={results?.pagination.total || 0}
              />

              {results?.data?.map((restaurant) => (
                <SearchRestaurantCard restaurant={restaurant} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default SearchPage;
