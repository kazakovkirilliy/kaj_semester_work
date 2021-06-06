import React from 'react';
import { ContainerWithScrollbar } from '../../components/ContainerWithScrollbar';

type Props = {};

export const PrivacySettings: React.FC<Props> = ({}) => {
  return (
    <ContainerWithScrollbar disableHorizontalScroll={true}>
      <h1>Privacy settings</h1>
    </ContainerWithScrollbar>
  );
};
