import React, { useContext, useState } from 'react';
import styled from 'styled-components';

import { TaskRow } from './TaskRow';
import { Modal } from '../../../components/Modal/Modal';
import { DashboardContext } from '../DashboardContext';
import { EditTaskForm } from './EditTaskForm';
import { BsPlusCircleFill } from 'react-icons/bs';
import { colors } from '../../../style/colors';
import { DummyButton } from '../../../style/components/DummyButton';
import { ContainerWithScrollbar } from '../../../components/ContainerWithScrollbar';

interface MyTasksProps {}

export const MyTasks: React.FC<MyTasksProps> = () => {
  /**
   * null = closed
   * -1 = new task
   * (any other int) = task id
   */
  const [taskInModalId, setTaskInModalId] = useState<number | null>(null);

  const { currentProject, tasks, refresh } = useContext(DashboardContext);

  const postFormSubmit = () => {
    if (refresh) refresh();
    setTaskInModalId(null);
  };

  return (
    <S.Wrapper>
      <S.TitleWrapper>
        <S.Title>My tasks</S.Title>
        {currentProject?.id && (
          <Modal
            title="Create new task"
            toggleButton={(showMenu) => (
              <S.CreateProjectButton
                onClick={() => {
                  showMenu();
                  setTaskInModalId(-1);
                }}
              >
                <BsPlusCircleFill />
              </S.CreateProjectButton>
            )}
          >
            <EditTaskForm
              submitButtonText={'Create task'}
              onDone={postFormSubmit}
              initialData={
                taskInModalId !== -1 &&
                taskInModalId !== null &&
                tasks.find((task) => task.id === taskInModalId)
              }
            />
          </Modal>
        )}
      </S.TitleWrapper>

      <S.TaskContainer disableHorizontalScroll={true}>
        {tasks.map((task) => (
          <TaskRow task={task} key={task.id} setTaskInModalId={setTaskInModalId} />
        ))}
      </S.TaskContainer>
    </S.Wrapper>
  );
};

// ProjectInfo depends on this export for consistency
export const S = {
  CreateProjectButton: styled(DummyButton)`
    border-radius: 50%;
    color: ${colors.lightBlue};
    background-color: transparent;
    font-size: 2.5rem;
  `,
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
  `,
  TitleWrapper: styled.div`
    display: flex;
    align-items: center;

    > *:not(:last-child) {
      margin-right: 1rem;
    }
  `,
  TaskContainer: styled(ContainerWithScrollbar)`
    height: 55vh;
  `,
  Title: styled.h2`
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 5px;
    > small {
      color: gray;
      font-weight: initial;
      cursor: pointer;
    }
  `,
};
