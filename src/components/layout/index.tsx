import React from 'react';
import { RiTimerLine } from 'react-icons/ri';
import styled from 'styled-components';
import { colors } from '../../style/colors';
import { devices, layoutConstants } from '../../style/layoutConstants';
import { Header } from './Header';
import { Navbar } from './Navbar';

type Props = {
  subNav?: React.ReactNode;
};

const MainLayout: React.FC<Props> = ({ subNav, children }) => {
  return (
    <>
      <S.Layout>
        <Navbar />
        {subNav && <S.SubNav>{subNav}</S.SubNav>}
        <S.MainSection>
          <Header />
          {children}
        </S.MainSection>
      </S.Layout>
      <S.SmallDeviceError>
        Sorry, we do NOT support devices with such screen size yet!
        <RiTimerLine />
      </S.SmallDeviceError>
    </>
  );
};

export default MainLayout;

const S = {
  SmallDeviceError: styled.div`
    width: 100vw;
    height: 100vh;
    display: none;
    place-items: center;
    font-size: 3rem;
    padding: 5rem;

    @media only screen and ${devices.small} {
      display: grid;
    }
  `,
  Layout: styled.main`
    display: flex;
    height: 100vh;
    width: 100vw;

    @media only screen and ${devices.small} {
      display: none;
    }
  `,
  MainSection: styled.section`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: ${layoutConstants.paddingTop} ${layoutConstants.sidePadding}
      ${layoutConstants.paddingTop} 0;
    margin-left: ${layoutConstants.sidePadding};
  `,
  SubNav: styled.div`
    display: flex;
    flex-direction: column;
    border-right: 2px solid ${colors.layoutGrey};
    box-shadow: 10px 0 10px 0 ${colors.layoutGrey};
    width: ${layoutConstants.subNavWidth};
  `,
};
