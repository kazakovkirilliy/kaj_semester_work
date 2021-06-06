export type User = {
  id: string;
  firstName: string;
  lastName: string;
  position: string;
  email: string;
  imageUrl?: string;
} | null;

export type InitialStateType = {
  user: User;
  loading: boolean;
  errorMessage: string;
};

export const initialState: InitialStateType = {
  user: null,
  loading: false,
  errorMessage: '',
};
