import React from 'react';
import styled from 'styled-components';
import { Timerecord } from '../../../actions/dashboard/timerecord';
import { ContainerWithScrollbar } from '../../../components/ContainerWithScrollbar';
import { TimerecordCard } from './TimeRecordCard';

type Props = {
  timerecords: Timerecord[];
};

export const Timerecords: React.FC<Props> = ({ timerecords }) => {
  const initTimerecords = (): React.ReactNode => {
    return (
      <S.TimerecordsList disableHorizontalScroll={true} disableVerticalScroll={false}>
        {timerecords.map((tr, index) => {
          return <TimerecordCard tr={tr} key={index} />;
        })}
      </S.TimerecordsList>
    );
  };

  return (
    <S.Wrapper>
      <S.Title>Recent time records</S.Title>
      {initTimerecords()}
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
  `,
  Title: styled.h1`
    font-size: 2rem;
    font-weight: 700;
  `,
  TimerecordsList: styled(ContainerWithScrollbar)`
    margin: 2rem 0;
    width: 100%;
    padding-right: 2rem;
  `,
};
