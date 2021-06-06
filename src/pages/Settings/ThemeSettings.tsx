import React from 'react';
import { ContainerWithScrollbar } from '../../components/ContainerWithScrollbar';

type Props = {};

export const ThemeSettings: React.FC<Props> = ({}) => {
  return (
    <ContainerWithScrollbar disableHorizontalScroll={true}>
      <h1>Theme settings</h1>
    </ContainerWithScrollbar>
  );
};
