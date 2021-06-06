import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import React from 'react';
import { API_URL } from '../../../config/paths';
import { User } from '../state';
import { ActionType, AuthAction, LoginPayload, SignupPayload } from './types';

function getLoginRequestConfig(email, password): AxiosRequestConfig {
  const fd = new FormData();
  fd.append('email', email);
  fd.append('password', password);
  return {
    method: 'post',
    url: `${API_URL}/login`,
    data: fd,
    headers: { 'Content-Type': 'multipart/form-data' },
  };
}

const safeAxios = (a: AxiosRequestConfig): Promise<AxiosResponse> =>
  axios({
    ...a,
    withCredentials: true,
    validateStatus: (status) => status < 400,
  }).then((obj) => {
    // ???? otherwise the error is just returned instead of being thrown?!
    if (obj instanceof Error) throw obj;
    return obj;
  });

function persistLoginState() {
  localStorage.setItem('user', 'loggedIn');
}

export const login = (dispatch, loginPayload: LoginPayload) => {
  dispatch({ type: ActionType.LoginRequest });

  safeAxios(getLoginRequestConfig(loginPayload.email, loginPayload.password))
    .then(function (response) {
      if (response.data.loggedIn) {
        const user = getUser();
        user.then((value: User) => {
          persistLoginState();
          dispatch({ type: ActionType.LoginSuccess, payload: value });
        });
      } else {
        dispatch({ type: ActionType.LoginFailure, error: response.data.errorMessage });
      }
    })
    .catch(function ({ response }: AxiosError) {
      dispatch({ type: ActionType.LoginFailure, error: response?.statusText });
    });
};

/**
 * Sign up and log in immediately.
 */
export const signup = async (dispatch, form: SignupPayload): Promise<void> => {
  dispatch({ type: ActionType.RegisterRequest });

  const done: AxiosResponse | undefined = await safeAxios({
    method: 'post',
    url: `${API_URL}/register`,
    data: JSON.stringify(form),
    headers: {
      'content-type': 'application/json',
    },
  }).catch((err: AxiosError) => {
    if (err.response?.data?.message && err.response.status < 500) {
      return dispatch({
        type: ActionType.RegisterFailure,
        error: err.response.data.message,
      });
    } else
      return dispatch({
        type: ActionType.RegisterFailure,
        error: 'An error has occurred.',
      });
  });

  if (!done) return;

  await safeAxios(getLoginRequestConfig(form.email, form.password)).catch((e) =>
    dispatch({
      type: ActionType.LoginFailure,
      error: e.statusText,
    }),
  );

  const user = await getUser().catch((e) =>
    dispatch({
      type: ActionType.LoginFailure,
      error: e?.statusText,
    }),
  );
  persistLoginState();
  dispatch({ type: ActionType.RegisterSuccess, payload: user });
};

export const getUser = async (): Promise<User> => {
  const resp = await axios.get(API_URL + '/persons/me', { withCredentials: true });
  if (resp?.status === 200) return resp.data;
  else throw new Error(resp?.statusText ?? 'An error has occurred.');
};

export const logout = async (dispatch: React.Dispatch<AuthAction>) => {
  dispatch({ type: ActionType.Logout });
  axios.get(API_URL + '/logout', { withCredentials: true }).catch(() => {});
  localStorage.removeItem('user');
};

export const postOAuthRedirect = async (dispatch: React.Dispatch<AuthAction>) => {
  dispatch({
    type: ActionType.LoginRequest,
  });
  getUser()
    .then((user) => {
      persistLoginState();
      dispatch({
        type: ActionType.LoginSuccess,
        payload: user,
      });
    })
    .catch((err: Error) => {
      dispatch({
        type: ActionType.LoginFailure,
        error: err.message,
      });
    });
};
