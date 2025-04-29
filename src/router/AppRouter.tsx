import { Route, Routes } from "react-router-dom";
import { routes } from ".";
import PrivateRoute from "./PrivateRoute";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import useUserStore from "../store/useUserStore";

const AppRouter = () => {
  const { isAuth } = useUserStore();

  return (
    <Routes>
      {routes.map((route) => {
        const isPrivate = route.isPrivate ?? false;

        return (
          <Route
            key={route.path}
            path={route.path}
            element={
              isPrivate ? (
                <PrivateRoute element={<route.component />} isAuth={isAuth} />
              ) : (
                <route.component />
              )
            }
          />
        );
      })}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRouter;
