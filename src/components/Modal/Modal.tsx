import React, { useState } from 'react';
import styled from 'styled-components';
import { FiX } from 'react-icons/all';
import { DummyButton } from '../../style/components/DummyButton';
import ModalStyling from './ModalStyling';
import { useChildrenWithProps } from '../../utils/hooks/useChildrenWithProps';

export type ModalProps = {
  toggleButton: (showMenu: () => void) => React.ReactNode;
  title?: string;
};

export const Modal: React.FC<ModalProps> = ({ toggleButton, title, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const childProps = { closeModal: () => setIsVisible(false) };

  return (
    <>
      {toggleButton(() => setIsVisible(true))}
      <ModalStyling.Dialog isVisible={isVisible}>
        <ContentWrapper>
          {title && (
            <ModalStyling.TitleContainer>
              <ModalStyling.TitleText>{title}</ModalStyling.TitleText>
            </ModalStyling.TitleContainer>
          )}
          <CloseContainer>
            <CloseButton onClick={(): void => setIsVisible(false)}>
              <FiX />
            </CloseButton>
          </CloseContainer>
          <Content>{useChildrenWithProps(children, { ...childProps })}</Content>
        </ContentWrapper>
        <ModalStyling.Overlay onClick={(): void => setIsVisible(false)} />
      </ModalStyling.Dialog>
    </>
  );
};

const Content = styled.div`
  grid-area: form;
  margin-top: 3rem;
  margin-bottom: 2.6rem;
`;

const CloseContainer = styled.div`
  grid-area: close;
  display: block;
  margin-left: auto;
  margin-top: 2.6rem;
`;

const CloseButton = styled(DummyButton)`
  background-color: transparent;
  font-size: 2rem;
`;

const ContentWrapper = styled(ModalStyling.ContentWrapper)`
  display: grid;
  grid-template-columns: 55% 45%;
  grid-template-rows: 10% 90%;
  grid-template-areas:
    'title close'
    'form form';
  top: 30%;
  left: 50%;
  transform: translate(-50%, -30%);
  width: 50vw;
  height: 70vh;
`;
