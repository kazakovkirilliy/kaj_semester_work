import { ActionType } from './actions/types';

export const AuthReducer = (initialState, action) => {
    switch (action.type) {
        case ActionType.LoginRequest:
          return {
            ...initialState,
            loading: true,
          };
        case ActionType.LoginSuccess:
          return {
            ...initialState,
            user: action.payload,
            loading: false,
            errorMessage: ''
          };
        case ActionType.Logout:
          return {
            ...initialState,
            user: null,
            errorMessage: ''
          };
        case ActionType.LoginFailure:
          return {
            ...initialState,
            loading: false,
            errorMessage: action.error
          };
     
        default:
          throw new Error(`Unhandled action type: ${action.type}`);
      }
}