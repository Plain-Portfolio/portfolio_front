import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../../utils/token";

const PrivateRoute = () => {
  return getToken() ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
