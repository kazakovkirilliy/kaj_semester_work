import React from 'react';
import { Login } from '../pages/Login';
import { Registration } from '../pages/Registration';
import { Dashboard } from '../pages/Dashboard';
import { About } from '../pages/About';
import { pathConstants } from './paths';
import { RouteComponentProps } from 'react-router';
import { NotFound } from '../pages/404';
import { UserInformation } from '../pages/UserInformation';
import { Settings } from '../pages/Settings';
import { PostOAuthLogin } from '../pages/PostLogin';

export type AppRouteType = {
  path: string;
  component: React.FC<RouteComponentProps>;
  isProtected: boolean;
  isAuth?: boolean;
};

export const routes: AppRouteType[] = [
  {
    path: pathConstants.login,
    component: Login,
    isProtected: false,
    isAuth: true,
  },
  {
    path: pathConstants.loginCallback,
    isProtected: false,
    isAuth: true,
    component: PostOAuthLogin,
  },
  {
    path: pathConstants.registration,
    component: Registration,
    isProtected: false,
    isAuth: true,
  },
  {
    path: pathConstants.dashboard,
    component: Dashboard,
    isProtected: true,
  },
  {
    path: pathConstants.about,
    component: About,
    isProtected: true,
  },
  {
    path: pathConstants.userInformation,
    component: UserInformation,
    isProtected: true,
  },
  {
    path: pathConstants.settings,
    component: Settings,
    isProtected: true,
  },
  {
    path: pathConstants.notFound,
    component: NotFound,
    isProtected: false,
  },
];
