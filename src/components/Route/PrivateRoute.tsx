import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { useContext } from "react";

const PrivateRoute = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
