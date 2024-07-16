import { Route, Routes } from "react-router-dom";
import LazyLoad from "./lib/LazyLoading";

const HomePage = LazyLoad(() => import("./pages/HomePage"));
const SignInPage = LazyLoad(() => import("./pages/SignIn"));
const SignUpPage = LazyLoad(() => import("./pages/SignUp"));
const SearchPage = LazyLoad(() => import("./pages/SearchPage"));

function AppRouter() {
  return (
    <Routes>
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />

      <Route path="/" element={<HomePage />} />
      <Route path="/search" element={<SearchPage />} />
    </Routes>
  );
}

export default AppRouter;
