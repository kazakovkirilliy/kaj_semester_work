import React from 'react';
import { Redirect, Route, RouteComponentProps, RouteProps } from 'react-router';
import { pathConstants } from '../config/paths';
import { AppRouteType } from '../config/routes';
import { useAuth } from '../context/auth/useAuth';
import LoadingPlaceholder from '../pages/LoadingPlaceholder';

export type ProtectedRouteProps = AppRouteType & RouteProps;

export const AppRoute = ({
  isProtected,
  isAuth,
  component,
  path,
  ...routeProps
}: ProtectedRouteProps) => {
  const { state } = useAuth();

  const renderRoute = (props: RouteComponentProps): React.ReactNode => {
    if (state.loading && !isAuth) {
      // don't unmount the auth components to preserve form state after auth failures
      return <LoadingPlaceholder />;
    } else {
      if (isAuth && localStorage.getItem('user')) {
        return <Redirect to={pathConstants.dashboard} />;
      }
      if (isProtected && !localStorage.getItem('user')) {
        return <Redirect to={pathConstants.login} />;
      }
      return React.createElement(component, props);
    }
  };

  return <Route {...routeProps} render={(props) => renderRoute(props)} />;
};
