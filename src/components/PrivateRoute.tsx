import { ACCESS_TOKEN_KEY } from 'src/constants/auth';
import Cookies from 'js-cookie';
import { useMemo } from 'react';
import { Navigate } from 'react-router-dom';
import { PrivateRouteI } from 'src/models/router';
import { RoutePath } from 'src/enums/routePath';

export const PrivateRoute = ({ children }: PrivateRouteI) => {
  const isLogined = useMemo(() => {
    return !!Cookies.get(ACCESS_TOKEN_KEY);
  }, []);

  return isLogined ? children : <Navigate to={RoutePath.LOGIN} replace />;
};
