import { Link } from "react-router-dom";

type Props = {
  city: string;
  total: number;
};

export const SearchResultsInfo = ({ city, total }: Props) => {
  return (
    <div className="flex items-center justify-between mt-6">
      <div className="flex flex-col lg:items-center lg:gap-2 lg:flex-row">
        <h1 className="text-2xl font-bold tracking-tight">
          {total} Restaurants found in {city}
        </h1>
        <Link
          to="/#search"
          className="text-blue-600 underline hover:text-primary transition"
        >
          Change Location
        </Link>
      </div>
      <div>Sort</div>
    </div>
  );
};
