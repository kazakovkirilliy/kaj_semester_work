import React from 'react';
import { Form, Formik } from 'formik';
import { InputField } from '../../components/Forms/Fields/fields/InputField';
import { ActionButton } from '../../style/components/forms/ActionButton';
import styled from 'styled-components';
import LoadingPlaceholder from '../LoadingPlaceholder';
import { signup } from '../../context/auth/actions/actions';
import { SignupPayload } from '../../context/auth/actions/types';
import { useAuth } from '../../context/auth/useAuth';
import { colors } from '../../style/colors';

const initialState: SignupPayload = {
  firstName: '',
  lastName: '',
  position: '',
  email: '',
  password: '',
  passwordConfirm: '',
};

const validateSignupForm = (values: SignupPayload) => {
  const errors: Record<string, string> = {};
  if (values.password !== values.passwordConfirm)
    errors.passwordConfirm = "Passwords don't match";
  return errors;
};

export const LocalSignupForm: React.FC = () => {
  const {
    state: { errorMessage, loading },
    dispatch,
  } = useAuth();
  const doSignup = (data) => void signup(dispatch, data);

  const formLoaderWrapper = (fn) => {
    return loading ? <LoadingPlaceholder /> : fn();
  };

  return (
    <>
      <LoginError>{errorMessage ?? ''}</LoginError>
      <Formik
        initialValues={initialState}
        onSubmit={doSignup}
        validate={validateSignupForm}
      >
        {formLoaderWrapper(() => (
          <SForm>
            <InputField
              fieldType="string"
              label="First name"
              placeholder="First name"
              name="firstName"
              required
            />
            <InputField
              fieldType="string"
              label="Last name"
              placeholder="Last name"
              name="lastName"
              required
            />
            <InputField
              fieldType="string"
              label="Position"
              placeholder="Your position"
              name="position"
            />
            <InputField
              fieldType="string"
              label="Email address"
              placeholder="Email address"
              name="email"
              type="email"
              required
            />
            <InputField
              fieldType="string"
              label="Password"
              placeholder="Password"
              name="password"
              type="password"
              required
            />
            <InputField
              fieldType="string"
              label="Confirm password"
              placeholder="Confirm password"
              name="passwordConfirm"
              type="password"
              autoComplete="new-password"
              required
            />
            <ActionButton type="submit">Sign up!</ActionButton>
          </SForm>
        ))}
      </Formik>
    </>
  );
};

const SForm = styled(Form)`
  display: flex;
  flex-direction: column;
  > div {
    margin-top: 1.8rem;
  }
  button {
    margin-top: 2.5rem;
  }
`;

const LoginError = styled.p`
  color: ${colors.error};
  margin: 0;
  height: 1.3rem;
  font-size: 1.3rem;
`;
