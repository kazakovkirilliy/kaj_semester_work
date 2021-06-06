import React from 'react';
import { AuthAction } from './actions/types';
import { initialState, InitialStateType } from './state';

export const AuthContext = React.createContext<{state: InitialStateType, dispatch: React.Dispatch<AuthAction>}>({ state: initialState, dispatch: () => undefined });