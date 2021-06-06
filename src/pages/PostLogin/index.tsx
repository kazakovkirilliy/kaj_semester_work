import React, { useEffect } from 'react';
import { Redirect, RouteComponentProps } from 'react-router';
import { pathConstants } from '../../config/paths';
import { postOAuthRedirect } from '../../context/auth/actions/actions';
import { ActionType } from '../../context/auth/actions/types';
import { useAuth } from '../../context/auth/useAuth';
import LoadingPlaceholder from '../LoadingPlaceholder';

export const PostOAuthLogin: React.FC<RouteComponentProps> = ({ location }) => {
  const { state, dispatch } = useAuth();
  const failed = !!location.search.match('failed');

  useEffect(() => {
    if (!failed) {
      postOAuthRedirect(dispatch);
    } else {
      dispatch({
        type: ActionType.LoginFailure,
        error: 'The chosen login platform encountered an error.',
        // TODO: parse what happened from the query param
      });
    }
  }, []);

  if (state.errorMessage || failed) {
    return <Redirect to={pathConstants.login} />;
  }

  if (state.user) {
    return <Redirect to={pathConstants.dashboard} />;
  }

  return <LoadingPlaceholder />;
};
