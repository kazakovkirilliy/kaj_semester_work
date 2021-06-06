import React from 'react';
import styled from 'styled-components';
import { Form, Formik } from 'formik';
import { ActionButton } from '../../style/components/forms/ActionButton';
import { InputField } from '../../components/Forms/Fields/fields/InputField';
import { colors } from '../../style/colors';
import { login } from '../../context/auth';
import { RouteComponentProps } from 'react-router-dom';
import { API_URL } from '../../config/paths';
import { useAuth } from '../../context/auth/useAuth';
import { FcGoogle } from 'react-icons/fc';
import { ImGithub } from 'react-icons/im';

type LoginValues = {
  email: string;
  password: string;
};

export const Login: React.FC<RouteComponentProps> = () => {
  const initialValues: LoginValues = {
    email: '',
    password: '',
  };

  const { dispatch, state } = useAuth();

  return (
    <S.Layout>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          login(dispatch, values);
        }}
      >
        {() => (
          <S.Form>
            <h1>Please, sign in</h1>
            <S.LoginError>{state.errorMessage ? state.errorMessage : ''}</S.LoginError>
            <InputField
              fieldType={'string'}
              label={'Email'}
              placeholder={'Enter email'}
              name={'email'}
            />
            <InputField
              fieldType={'string'}
              label={'Password'}
              placeholder={'Enter password'}
              name={'password'}
              type={'password'}
            />

            <ActionButton type="submit">
              {state.loading ? 'Loading...' : 'Sign in!'}
            </ActionButton>
            <S.OauthContainer>
              <S.OauthLink href={API_URL + '/oauth2/authorize/google'}>
                <FcGoogle />
                Sign in with google
              </S.OauthLink>
              <S.OauthLink href={API_URL + '/oauth2/authorize/github'}>
                <ImGithub />
                Sign in with GitHub
              </S.OauthLink>
            </S.OauthContainer>
          </S.Form>
        )}
      </Formik>
    </S.Layout>
  );
};

export default Login;

const S = {
  Layout: styled.main`
    display: flex;
    height: 100vh;
    width: 100vw;
    align-items: center;
    justify-content: center;
    background: #fff;
  `,
  Form: styled(Form)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 400px;
    height: 400px;
    border: 2px solid ${colors.layoutGrey};
    padding: 2rem;
    border-radius: 0.5rem;
    font-size: 1.3rem;
    margin: 0 5rem;

    > div {
      margin-top: 1.8rem;
    }

    button {
      margin-top: 2.5rem;
    }
  `,
  OauthContainer: styled.div`
    display: flex;
    width: 100%;
    justify-content: space-around;
  `,
  OauthLink: styled.a`
    display: flex;
    align-items: center;
    padding: 0.8rem;
    border-radius: 0.5rem;
    width: max-content;
    transition: 200ms all;

    &:hover {
      background-color: ${colors.layoutGrey};
    }

    svg {
      margin-right: 0.8rem;
      font-size: 2rem;
    }
  `,
  LoginError: styled.p`
    color: ${colors.error};
    margin: 0;
    height: 1.3rem;
    font-size: 1.3rem;
  `,
};
