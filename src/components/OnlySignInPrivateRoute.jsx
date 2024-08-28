import { Outlet, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const OnlySignInPrivateRoute = () => {
  return Cookies.get("_blog_token") ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default OnlySignInPrivateRoute;
