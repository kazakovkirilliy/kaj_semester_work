import styled from 'styled-components';

type CWSProps = {
  disableVerticalScroll?: boolean,
  disableHorizontalScroll?: boolean
}

export const ContainerWithScrollbar = styled.div<CWSProps>`
  overflow-y: ${(props): string => (props.disableVerticalScroll ? 'hidden' : 'auto')};
  overflow-x: ${(props): string => (props.disableHorizontalScroll ? 'hidden' : 'auto')};

  &::-webkit-scrollbar {
    width: 0.8rem;
    height: 0.8rem;
  }

  &::-webkit-scrollbar-track {
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background: #c7c5c5;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #adadadf7;
  }

  scrollbar-width: thin;
  scrollbar-color: #c7c5c5;
`;