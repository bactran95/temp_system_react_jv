import MainLayout from 'src/layouts/MainLayout';
import { lazy } from 'react';
import { RouteI } from 'src/models/router';
import { RoutePath } from 'src/enums/routePath';

const LoginPage = import('../pages/Login');
const UserPage = import('../pages/User');

export const routes: RouteI[] = [
  {
    path: RoutePath.LOGIN,
    Component: lazy(() => LoginPage)
  },
  {
    path: RoutePath.USER,
    Component: lazy(() => UserPage),
    Layout: <MainLayout />,
    isPrivate: true
  }
];
