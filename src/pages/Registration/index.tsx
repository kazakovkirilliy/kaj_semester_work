import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';
import styled from 'styled-components';
import { colors } from '../../style/colors';
import { API_URL } from '../../config/paths';
import { FcGoogle } from 'react-icons/fc';
import { ImGithub } from 'react-icons/im';
import { LocalSignupForm } from './LocalSignupForm';
import { Link } from 'react-router-dom';

export const Registration: React.FC<RouteComponentProps> = () => {
  const [usingLocalAuth, setUsingLocalAuth] = useState(false);

  const Wrapper = usingLocalAuth ? S.LocalSignupWrapper : S.SignupMethodChoiceWrapper;

  return (
    <S.Layout>
      <Wrapper>
        <S.Heading>Please, sign up</S.Heading>
        {usingLocalAuth ? (
          <>
            <S.P>
              <S.A type="button" onClick={() => setUsingLocalAuth(false)}>
                Back to options list
              </S.A>
            </S.P>
            <LocalSignupForm />
          </>
        ) : (
          <>
            <S.P>
              Already a user? <S.Link to="/login">Go sign in instead.</S.Link>
            </S.P>
            <S.SignupButton href={API_URL + '/oauth2/authorize/google'}>
              <FcGoogle />
              <span>Sign up with Google</span>
            </S.SignupButton>
            <S.SignupButton href={API_URL + '/oauth2/authorize/github'}>
              <ImGithub />
              <span>Sign up with GitHub</span>
            </S.SignupButton>
            <S.SignupButton type="button" onClick={() => setUsingLocalAuth(true)}>
              <span>Sign up using email address</span>
            </S.SignupButton>
          </>
        )}
      </Wrapper>
    </S.Layout>
  );
};

const baseFormWrapperStyle = `
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 2px solid ${colors.layoutGrey};
    padding: 2rem;
    border-radius: 0.5rem;
    font-size: 1.3rem;
    margin: 0 5rem;
    width: 400px;
`;

// mostly copied from Login but there are important changes!
const S = {
  Heading: styled.h1`
    margin-bottom: 1rem;
    align-self: start;
  `,
  P: styled.p`
    align-self: start;
    margin-bottom: 1rem;
    font-size: 1.3rem;
  `,
  A: styled.a`
    color: ${colors.lightBlue};
    cursor: pointer;
  `,
  Link: styled(Link)`
    color: ${colors.lightBlue};
  `,
  Layout: styled.main`
    display: flex;
    height: 100vh;
    width: 100vw;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  `,
  SignupMethodChoiceWrapper: styled.div`
    ${baseFormWrapperStyle};
    height: 250px;
  `,
  LocalSignupWrapper: styled.div`
    ${baseFormWrapperStyle};
    height: 600px;
  `,
  SignupButton: styled.a`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.8rem;
    border-radius: 0.5rem;
    width: 350px;
    transition: 200ms all;
    cursor: pointer;
    border: 1px solid ${colors.layoutGrey};
    margin-bottom: 10px;

    &:hover {
      background-color: ${colors.layoutGrey};
    }

    svg {
      margin-right: 0.8rem;
      font-size: 2rem;
    }
  `,
};
