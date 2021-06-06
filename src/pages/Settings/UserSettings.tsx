import React from 'react';
import { BsFillShieldLockFill } from 'react-icons/bs';
import { HiOutlineHome } from 'react-icons/hi';
import { IoBrush } from 'react-icons/io5';
import { NavLink, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '../../style/colors';
import SubNavStyling from '../../style/components/SubNavStyling';
import { UnorderedList } from '../../style/components/UnorderedList';

type Props = {};

export const UserSettings: React.FC<Props> = () => {
  let { url } = useRouteMatch();
  return (
    <S.Navbar>
      <SubNavStyling.Header>
        <SubNavStyling.Title>Settings</SubNavStyling.Title>
      </SubNavStyling.Header>
      <S.Ul>
        <li>
          <NavLink activeStyle={S.LightLink} to={`${url}/general`}>
            <HiOutlineHome /> General
          </NavLink>
        </li>
        <li>
          <NavLink activeStyle={S.LightLink} to={`${url}/theme`}>
            <IoBrush /> Theme
          </NavLink>
        </li>
        <li>
          <NavLink activeStyle={S.LightLink} to={`${url}/privacy`}>
            <BsFillShieldLockFill /> Privacy
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
    user-select: none;
  `,
  Ul: styled(UnorderedList)`
    flex-direction: column;

    li {
      margin-bottom: 3rem;

      a {
        padding: 1rem;
        justify-content: flex-start;
        color: ${colors.darkBlue};
        transition: 200ms all;

        svg {
          margin-right: 1rem;
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
