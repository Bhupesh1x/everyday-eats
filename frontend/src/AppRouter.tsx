import { Navigate, Route, Routes } from "react-router-dom";

import LazyLoad from "./lib/LazyLoading";
import ProtectedRoute from "./ProtectedRoute";

const HomePage = LazyLoad(() => import("./pages/HomePage"));
const SignInPage = LazyLoad(() => import("./pages/SignIn"));
const SignUpPage = LazyLoad(() => import("./pages/SignUp"));
const SearchPage = LazyLoad(() => import("./pages/SearchPage"));
const VerifyEmailPage = LazyLoad(() => import("./pages/VerifyEmail"));
const UserProfilePage = LazyLoad(() => import("./pages/UserProfile"));
const ManageRestaurantPage = LazyLoad(() => import("./pages/ManageRestaurant"));

function AppRouter() {
  return (
    <Routes>
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route
        path="/verify/:userId/token/:token"
        element={<VerifyEmailPage />}
      />

      <Route path="/" element={<HomePage />} />
      <Route path="/search/:city" element={<SearchPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/user-profile" element={<UserProfilePage />} />
        <Route path="/my-restaurant" element={<ManageRestaurantPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default AppRouter;
