import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { pathConstants } from '../../../config/paths';
import { useAuth } from '../../../context/auth/useAuth';
import { colors } from '../../../style/colors';
import { UnorderedList } from '../../../style/components/UnorderedList';
import { layoutConstants } from '../../../style/layoutConstants';

import { UserLink } from '../../UserLink';

export const Header: React.FC = () => {
  const { state } = useAuth();
  return (
    <S.Header>
      <S.Ul>
        <li>
          {state.user && (
            <NavLink to={pathConstants.userInformation}>
              {state.user.firstName + ' ' + state.user.lastName}
              <S.UserIconWrapper>
                <UserLink user={state.user} />
              </S.UserIconWrapper>
            </NavLink>
          )}
        </li>
      </S.Ul>
    </S.Header>
  );
};

const S = {
  Header: styled.header`
    display: flex;
    align-items: flex-start;
    min-height: ${layoutConstants.headerHeight};
    user-select: none;
  `,
  Ul: styled(UnorderedList)`
    justify-content: flex-end;
    li {
      margin-right: 1.5rem;
      width: max-content;

      a svg {
        font-size: 2rem;
      }
    }
  `,
  ActiveNavLink: {
    color: colors.link.active,
  },

  UserImage: styled.img`
    border-radius: 15%;
    width: 35px;
    height: 35px;
    margin-left: 0.8rem;
  `,
  UserIconWrapper: styled.div`
    margin-left: 1rem;
  `,
};
