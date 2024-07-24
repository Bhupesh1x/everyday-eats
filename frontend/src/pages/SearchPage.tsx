import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Layout from "../layouts/Layout";

import { useSearch } from "../features/search/queries";

import { Loader } from "../components/Loader";
import { SearchBar, SearchFormType } from "../components/SearchBar";
import { PaginationSelector } from "../components/PaginationSelector";
import { SearchResultsInfo } from "../components/search/SearchResultsInfo";
import { SearchRestaurantCard } from "../components/search/SearchRestaurantCard";

export type SearchState = {
  search?: string;
  page?: number;
};

function SearchPage() {
  const [searchState, setSearchState] = useState<SearchState>({
    search: "",
    page: 1,
  });

  const params = useParams();

  const {
    data: results,
    isLoading,
    isError,
  } = useSearch(params.city, searchState);

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
      });
    };

    scrollToTop();
  }, []);

  function onSearch(searchData: SearchFormType) {
    setSearchState((prev) => ({
      ...prev,
      search: searchData.search,
      page: 1,
    }));
  }

  function onReset() {
    setSearchState((prev) => ({
      ...prev,
      search: "",
      page: 1,
    }));
  }

  function onPageChange(page: number) {
    setSearchState((prev) => ({
      ...prev,
      page,
    }));
  }

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
              <SearchBar
                removeMargin
                btnText="Reset"
                onReset={onReset}
                onSubmit={onSearch}
                searchValue={searchState.search}
                placeholder="Search by Cuisine or Restaurant name"
              />

              <SearchResultsInfo
                city={params.city}
                total={results?.pagination.total || 0}
              />

              {results?.data?.map((restaurant) => (
                <SearchRestaurantCard
                  key={restaurant._id}
                  restaurant={restaurant}
                />
              ))}
              <PaginationSelector
                page={searchState.page || 1}
                totalPages={results?.pagination?.totalPages || 1}
                onPageChange={onPageChange}
              />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default SearchPage;
