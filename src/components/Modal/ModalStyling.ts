import styled from 'styled-components';

const ModalStyling = {
  Dialog: styled.div<{ isVisible: boolean }>`
  position: relative;
  display: ${(props): string => (props.isVisible ? 'block' : 'none')};
  cursor: auto;
`,
  ContentWrapper: styled.div`
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -30%);
  background: #fff;
  padding: 0 3.2rem;
  z-index: 11;
  border-radius: 0.5rem;
`,
  Overlay: styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0.3;
  z-index: 10;
`,
  TitleContainer: styled.div`
  display: block;
  align-items: center;
  word-break: break-word;
`,

  TitleText: styled.h1`
  font-size: 2rem;
  margin-top: 2.6rem;
`
}

export default ModalStyling;