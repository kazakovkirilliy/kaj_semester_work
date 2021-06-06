import React, { useState } from 'react';
import styled from 'styled-components';
import { DummyButton } from '../../style/components/DummyButton';
import { ModalProps } from './Modal';
import { colors } from '../../style/colors';
import ModalStyling from './ModalStyling';

type Props = {
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
} & ModalProps;

export const ConfirmModal: React.FC<Props> = ({
  title,
  onConfirm,
  toggleButton,
  confirmText,
  cancelText,
}) => {
  const [isVisible, setIsVisible] = useState(false);

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
          <ActionButtons>
            <ConfirmButton
              onClick={() => {
                onConfirm();
                setIsVisible(false);
              }}
            >
              {confirmText ? confirmText : 'Ok'}
            </ConfirmButton>
            <CancelButton onClick={() => setIsVisible(false)}>
              {cancelText ? cancelText : 'Cancel'}
            </CancelButton>
          </ActionButtons>
        </ContentWrapper>
        <ModalStyling.Overlay onClick={(): void => setIsVisible(false)} />
      </ModalStyling.Dialog>
    </>
  );
};

const ActionButtons = styled.div`
  display: flex;
  justify-content: space-around;
  width: 70%;
  flex-wrap: wrap;
`;

const ActionButton = styled(DummyButton)`
  padding: 1rem 3rem;
  color: #ffffff;
  font-weight: 500;
`;

const ConfirmButton = styled(ActionButton)`
  background-color: ${colors.success};
`;

const CancelButton = styled(ActionButton)`
  background-color: ${colors.error};
`;

const ContentWrapper = styled(ModalStyling.ContentWrapper)`
  display: grid;
  place-items: center;
  width: 30vw;
  height: 40vh;
  color: initial;
`;
