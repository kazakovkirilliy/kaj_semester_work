import React from 'react';
import { HiCog, HiHome, HiLogout } from 'react-icons/all';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { pathConstants } from '../../../config/paths';
import { logout } from '../../../context/auth';
import { useAuth } from '../../../context/auth/useAuth';
import { colors } from '../../../style/colors';
import { UnorderedList } from '../../../style/components/UnorderedList';
import { layoutConstants } from '../../../style/layoutConstants';

export const Navbar: React.FC = () => {
  const { dispatch } = useAuth();
  return (
    <S.Navbar>
      <S.Ul>
        <li>
          <NavLink activeStyle={S.LightLink} to={pathConstants.dashboard}>
            <HiHome />
          </NavLink>
        </li>
        <li>
          <NavLink activeStyle={S.LightLink} to={pathConstants.settings + '/general'}>
            <HiCog />
          </NavLink>
        </li>
        <li>
          <NavLink
            to={pathConstants.login}
            onClick={() => {
              logout(dispatch);
            }}
          >
            <HiLogout />
          </NavLink>
        </li>
      </S.Ul>
    </S.Navbar>
  );
};

const S = {
  Navbar: styled.nav`
    display: flex;
    flex-direction: column;
    min-width: ${layoutConstants.navbarWidth};
    padding-top: 10rem;
    user-select: none;
    background-color: ${colors.lightBlue};
  `,
  Ul: styled(UnorderedList)`
    flex-direction: column;

    li {
      margin-bottom: 3rem;

      &:last-of-type {
        margin-top: auto;
      }

      a {
        color: ${colors.link.notActive};

        svg {
          font-size: 2.8rem;
        }
      }
    }
  `,
  LightLink: {
    color: colors.link.active,
    backgroundColor: colors.link.background,
  },
};
