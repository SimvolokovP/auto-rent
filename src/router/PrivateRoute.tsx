import { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  element: ReactNode;
  isAuth: boolean;
}

const PrivateRoute: FC<PrivateRouteProps> = ({ element, isAuth }) => {
  return isAuth ? element : <Navigate to="/auth" />;
};

export default PrivateRoute;
