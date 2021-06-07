import React, { useContext } from 'react';
import { HiClock, HiTag, HiTrash } from 'react-icons/hi';
import styled from 'styled-components';
import { deleteTimerecord, Timerecord } from '../../../actions/dashboard/timerecord';
import { ConfirmModal } from '../../../components/Modal/ConfirmModal';
import { colors } from '../../../style/colors';
import { DummyButton } from '../../../style/components/DummyButton';
import { useCalculateDuration } from '../../../utils/hooks/useCalculateDuration';
import { DashboardContext } from '../DashboardContext';

type Props = {
  tr: Timerecord;
};

export const TimerecordCard: React.FC<Props> = ({ tr }) => {
  const { currentProject, refresh } = useContext(DashboardContext);

  const deleteRecord = async () => {
    await deleteTimerecord(currentProject?.id, tr.id);
    if (refresh) refresh();
  };

  const renderTags = () => {
    const screenWidth = window.innerWidth;
    const arrayLen = tr.tags.length;
    const maxDisplayedTags = screenWidth > 780 ? 2 : 1;
    return (
      <>
        {arrayLen > 0 && <HiTag />}
        {tr.tags.map((t, index) => (
          <>{index < maxDisplayedTags && <S.Tag key={t.id}>{t.title}</S.Tag>}</>
        ))}
        {arrayLen > maxDisplayedTags && `+ ${arrayLen - maxDisplayedTags} more`}
      </>
    );
  };

  return (
    <S.Wrapper>
      <S.TimerecordInfo>
        <S.Title>
          {tr.description ? tr.description : 'New time record'}
        </S.Title>
        <S.ExtraInfo>
          <S.TimeContainer>
            <HiClock />
            {tr.endTime ? useCalculateDuration(tr.startTime, tr.endTime) : <p>ongoing</p>}
          </S.TimeContainer>
          <S.TagsContainer>{renderTags()}</S.TagsContainer>
        </S.ExtraInfo>
      </S.TimerecordInfo>
      <ConfirmModal
        title={'Delete this time record?'}
        onConfirm={deleteRecord}
        toggleButton={(openModal) => (
          <S.DeleteButton onClick={openModal}>
            <HiTrash />
          </S.DeleteButton>
        )}
      />
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.article`
    display: flex;
    align-items: center;
    padding: 0.8rem;
    border-bottom: 2px solid ${colors.layoutGrey};
    margin-bottom: 1rem;
  `,
  ExtraInfo: styled.div`
    display: flex;
    margin-top: 1rem;
    align-items: center;
    font-size: 1.3rem;
    color: ${colors.darkGrey};

    > div {
      margin-right: 1rem;
    }
  `,
  TimerecordInfo: styled.div`
    display: flex;
    flex-direction: column;
  `,
  Title: styled.h4`
    color: ${colors.darkGrey};
    font-weight: 400;
  `,
  TimeContainer: styled.div`
    display: flex;
    align-items: center;
    margin-right: 1rem;
    svg {
      margin-right: 0.5rem;
    }
  `,
  TagsContainer: styled.div`
    svg {
      margin-right: 0.5rem;
    }
  `,
  DeleteButton: styled(DummyButton)`
    display: flex;
    background-color: transparent;
    margin-left: auto;
    padding: 0.8rem;
    font-size: 2rem;
    color: ${colors.darkGrey};
    transition: 200ms all;

    &:hover {
      color: ${colors.error};
    }
  `,
  Tag: styled.span`
    padding: 0.3rem;
    background-color: ${colors.layoutGrey};
    color: ${colors.darkGrey};
    margin-right: 0.3rem;
    border-radius: 0.3rem;
  `,
};
