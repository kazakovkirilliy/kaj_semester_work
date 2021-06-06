import styled from 'styled-components';
import { colors } from '../colors';

export const DummyButton = styled.button`
  display: flex;
  align-items: center;
  border: none;
  border-radius: .5rem;
  background-color: ${colors.layoutGrey};
  transition: all 100ms;
  outline: none;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;
