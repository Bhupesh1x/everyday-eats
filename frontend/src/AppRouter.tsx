import { Route, Routes } from "react-router-dom";
import LazyLoad from "./lib/LazyLoading";

const HomePage = LazyLoad(() => import("./pages/HomePage"));
const SearchPage = LazyLoad(() => import("./pages/SearchPage"));

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/search" element={<SearchPage />} />
    </Routes>
  );
}

export default AppRouter;
