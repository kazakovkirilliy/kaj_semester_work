import React, { useEffect } from 'react';
import styled from 'styled-components';
import { ContainerWithScrollbar } from '../../components/ContainerWithScrollbar';
import MainLayout from '../../components/layout';
import { UserLink } from '../../components/UserLink';
import { getUser } from '../../context/auth';
import { useAuth } from '../../context/auth/useAuth';
import { colors } from '../../style/colors';

export const UserInformation: React.FC = () => {
  const {
    state: { user },
  } = useAuth();
  useEffect(() => {
    getUser().then((res) => console.log(res));
  }, []);

  const renderUserInfo = () => {
    if (user) {
      return Object.entries(user).map((entry, index) => (
        <>
          {entry[0] !== 'id' && entry[0] !== 'imageUrl' && (
            <S.Field key={index}>
              <S.FieldTitle>{entry[0]}:</S.FieldTitle>
              <S.FieldBody>{entry[1]}</S.FieldBody>
            </S.Field>
          )}
        </>
      ));
    } else {
      return <></>;
    }
  };

  return (
    <MainLayout>
      <h1>User Information</h1>
      <S.Wrapper disableHorizontalScroll={true} disableVerticalScroll={false}>
        {user && <UserLink style={S.UserLinkStyles} user={user} />}
        <S.Description>{renderUserInfo()}</S.Description>
      </S.Wrapper>
    </MainLayout>
  );
};

const S = {
  Wrapper: styled(ContainerWithScrollbar)`
    margin-top: 2rem;
    display: flex;
    border-radius: 1rem;
    padding: 5rem;
    width: max-content;
    box-shadow: 0 10px 10px 0 ${colors.layoutGrey},
      -8px -8px 12px 0 rgba(255, 255, 255, 0.3);
    justify-content: space-around;
    align-items: center;
  `,
  Field: styled.div`
    display: grid;
    grid-template-columns: 0.4fr 0.6fr;
    width: 30rem;
    text-align: left;
    padding: 1rem 0;
    align-items: flex-end;
  `,
  FieldTitle: styled.p`
    &:first-letter {
      text-transform: uppercase;
    }
    font-weight: bold;
  `,
  FieldBody: styled.p``,
  UserPhoto: styled.img`
    border-radius: 15%;
    width: 100px;
    height: 100px;
  `,

  UserLinkStyles: {
    width: '100px',
    height: '100px',
    fontSize: '3.5rem',
  },

  Description: styled.div`
    margin-left: 4rem;
  `,
};
