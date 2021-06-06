import React from 'react';
import styled from 'styled-components';
import { User } from '../context/auth/state';
import { AbbreviationBox, linkStyles } from './AbbreviationBox';

type Props = { user: User; style?: {} };

export const UserLink: React.FC<Props> = ({ style, user }) => {
  if (!user) return null;
  return (
    <>
      {user.imageUrl ? (
        <UserPhoto style={style} src={user.imageUrl} />
      ) : (
        <AbbreviationBox style={style} phrase={user.firstName + ' ' + user.lastName} />
      )}
    </>
  );
};

const UserPhoto = styled.img`
  ${linkStyles}
`;
