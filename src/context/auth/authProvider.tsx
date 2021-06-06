import React, { useReducer } from 'react';
import { AuthContext } from './context';
import { AuthReducer } from './reducer';
import { initialState } from './state';

export const AuthProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>
  );
};
