import { User } from '../state';

export type LoginPayload = {
  email: string;
  password: string;
};

export type SignupPayload = {
  firstName: string;
  lastName: string;
  position: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export enum ActionType {
  LoginRequest,
  LoginSuccess,
  LoginFailure,
  RegisterRequest,
  RegisterSuccess,
  RegisterFailure,
  Logout,
}

interface IAuthRequest {
  type: ActionType.LoginRequest | ActionType.RegisterRequest;
}

interface IAuthSuccess {
  type: ActionType.LoginSuccess | ActionType.RegisterSuccess;
  payload: User;
}

interface IAuthFailure {
  type: ActionType.LoginFailure | ActionType.RegisterFailure;
  error?: string;
}

interface ILogout {
  type: ActionType.Logout;
}

export type AuthAction = IAuthRequest | IAuthSuccess | IAuthFailure | ILogout;
