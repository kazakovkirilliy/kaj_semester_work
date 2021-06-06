import { Form, Formik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { HiPlay, HiRefresh, HiStop } from 'react-icons/hi';
import styled from 'styled-components';
import { InputField } from '../../../components/Forms/Fields/fields/InputField';
import {
  createTimerecord,
  deleteTimerecord,
  Timerecord,
  TimerecordPayload,
  updateTimerecord,
} from '../../../actions/dashboard/timerecord';
import { colors } from '../../../style/colors';
import { DummyButton } from '../../../style/components/DummyButton';
import { useFormatTime } from '../../../utils/hooks/useFormatTime';
import { Tag } from '../../../actions/dashboard/tag';
import { MultiSelectField } from './components/MultiSelectField';
import { DashboardContext } from '../DashboardContext';
import { Task } from '../../../actions/dashboard/task';

type Props = {
  tasks: Task[];
  tags: Tag[];
};

export const Timer: React.FC<Props> = ({ tasks, tags }) => {
  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [intervalId, setIntervalId] = useState<number>(0);
  const [curTimerecord, setCurTimerecord] = useState<Timerecord>();
  const { currentProject, refresh } = useContext(DashboardContext);

  const increaseTime = () => {
    setTime((prev) => prev + 1);
  };

  // Increase time if the timer is running
  useEffect(() => {
    if (refresh) refresh();
    if (running) {
      let interval: number = window.setInterval(increaseTime, 1000);
      setIntervalId(interval);
    } else {
      if (time !== 0) {
        clearInterval(intervalId);
        setTime(0);
      }
    }
  }, [running]);

  const handleStart = (payload: TimerecordPayload) => {
    const promise = createTimerecord(currentProject?.id, payload);
    promise.then((res: Timerecord) => {
      setRunning(true);
      setCurTimerecord(res);
    });
  };

  const handleReset = () => {
    const promise = deleteTimerecord(currentProject?.id, curTimerecord?.id);
    promise.then(() => {
      setRunning(false);
      setTime(0);
      if (refresh) refresh();
    });
  };

  const handleSave = (payload: TimerecordPayload) => {
    const promise = updateTimerecord(currentProject?.id, curTimerecord?.id, payload);
    promise.then(() => {
      setRunning(false);
      if (refresh) refresh();
    });
  };

  return (
    <S.Wrapper>
      <S.Title>Time tracking</S.Title>
      <Formik
        initialValues={{
          description: '',
          startTime: '',
          tags: [],
          taskId: '',
        }}
        onSubmit={(values: TimerecordPayload, { resetForm }) => {
          handleSave({
            ...values,
            startTime: curTimerecord?.startTime || '',
            endTime: new Date().toISOString(),
          });
          resetForm({});
        }}
      >
        {({ values }) => (
          <Form>
            <S.TimerContainer>
              <S.Time>{useFormatTime(time)}</S.Time>
              <S.Buttons>
                {running ? (
                  <S.Stop type="submit">
                    <HiStop />
                  </S.Stop>
                ) : (
                  <S.Start
                    type={'button'}
                    onClick={() =>
                      handleStart({ ...values, startTime: new Date().toISOString() })
                    }
                  >
                    <HiPlay />
                  </S.Start>
                )}
                <S.Delete type="button" onClick={handleReset}>
                  <HiRefresh />
                </S.Delete>
              </S.Buttons>
            </S.TimerContainer>
            <S.FieldContainer>
              <InputField
                underlined
                label={'Description'}
                name={'description'}
                maxLength={30}
                placeholder={'E.g. My new time record'}
              />
              {tags.length > 0 && (
                <MultiSelectField
                  label={'Tags'}
                  data={tags}
                  name={'tags'}
                  toggleText={
                    values.tags.length === 0
                      ? 'Add tag'
                      : `${values.tags.length} tag${
                          values.tags.length > 1 ? 's' : ''
                        } added`
                  }
                />
              )}

              {tasks.length > 0 && (
                <InputField
                  fieldType="select"
                  name={'taskId'}
                  label={'Task'}
                  underlined={true}
                >
                  <option>Select a task</option>
                  {tasks.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.subject}
                    </option>
                  ))}
                </InputField>
              )}
            </S.FieldContainer>
          </Form>
        )}
      </Formik>
    </S.Wrapper>
  );
};

const TimerActionButton = styled(DummyButton)`
  font-size: 6rem;
  background-color: transparent;
  margin-left: 1.5rem;
`;

const S = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
  `,
  Title: styled.h1`
    font-size: 2rem;
    font-weight: 700;
  `,
  Time: styled.h2`
    font-size: 4rem;
    border-radius: 10rem;
    width: max-content;
  `,
  TimerContainer: styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    margin: 2rem 0 1.5rem;
  `,
  Buttons: styled.div`
    display: flex;
    align-items: center;
  `,
  Start: styled(TimerActionButton)`
    color: ${colors.lightBlue};
  `,
  Stop: styled(TimerActionButton)`
    color: ${colors.error};
  `,
  Delete: styled(DummyButton)`
    background-color: transparent;
    font-size: 3rem;
    color: ${colors.darkGrey};
    margin-left: 1.5rem;
  `,
  FieldContainer: styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-end;

    > div:first-of-type {
      width: 100%;
    }

    div:not(:first-of-type) {
      margin-top: 1rem;
    }
  `,
};
