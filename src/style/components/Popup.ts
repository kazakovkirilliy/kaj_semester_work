import styled from 'styled-components';

export const Popup = styled.div<{
  isVisible: boolean
}>`
  position: absolute;
  display: ${(props): string => (props.isVisible ? 'flex' : 'none')};
  flex-direction: column;
  background-color: #fff;
  box-shadow: 0 0.2rem 0.3rem #00000029;
  border-radius: 0.4rem;
`;
