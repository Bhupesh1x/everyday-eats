import { useNavigate } from "react-router-dom";

type Props = {
  city: string;
  total: number;
};

export const SearchResultsInfo = ({ city, total }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col lg:items-center lg:gap-2 lg:flex-row">
      <h1 className="text-2xl font-bold tracking-tight">
        {total} Restaurants found in {city}
      </h1>
      <p
        onClick={() => navigate(-1)}
        className="text-blue-600 underline hover:text-primary transition cursor-pointer"
      >
        Change Location
      </p>
    </div>
  );
};
