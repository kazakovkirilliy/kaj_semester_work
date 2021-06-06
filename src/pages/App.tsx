import axios, { AxiosError } from 'axios';
import React, { Suspense, useEffect } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { AppRoute } from '../components/AppRoute';
import { pathConstants } from '../config/paths';
import { routes } from '../config/routes';
import { getUser, logout } from '../context/auth';
import { ActionType } from '../context/auth/actions/types';
import { useAuth } from '../context/auth/useAuth';
import { NotFound } from './404';
import LoadingPlaceholder from './LoadingPlaceholder';

const App: React.FC = () => {
  const { dispatch } = useAuth();
  const isLoginCallback = useRouteMatch(pathConstants.loginCallback);

  const initUser = () => {
    if (isLoginCallback) return;

    dispatch({ type: ActionType.LoginRequest });
    getUser()
      .then((res) => {
        dispatch({ type: ActionType.LoginSuccess, payload: res });
        localStorage.setItem('user', 'loggedIn');
      })
      .catch(() => {
        dispatch({ type: ActionType.LoginFailure });
        localStorage.removeItem('user');
      });
  };

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        logout(dispatch);
      }
      return error;
    },
  );

  useEffect(() => {
    initUser();
  }, []);

  return (
    <>
      {navigator.onLine ? (
        <Suspense fallback={<LoadingPlaceholder />}>
          <Switch>
            {routes.map((r) => (
              <AppRoute key={r.path} {...r} />
            ))}
            <Route exact path="/">
              <Redirect to={pathConstants.dashboard} />
            </Route>
            <Route path="*">
              <Redirect to={pathConstants.notFound} />
            </Route>
          </Switch>
        </Suspense>
      ) : (
        <NotFound />
      )}
    </>
  );
};
export default App;
