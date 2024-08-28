import { Outlet, Navigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";

const OnlySignInPrivateRoute = () => {
  const { userInfo } = useGlobalContext();
  return userInfo && userInfo.id ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default OnlySignInPrivateRoute;
