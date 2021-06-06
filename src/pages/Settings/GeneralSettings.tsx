import React from 'react';
import { ContainerWithScrollbar } from '../../components/ContainerWithScrollbar';

type Props = {};

export const GeneralSettings: React.FC<Props> = ({}) => {
  return (
    <ContainerWithScrollbar disableHorizontalScroll={true}>
      <h1>General settings</h1>
    </ContainerWithScrollbar>
  );
};
