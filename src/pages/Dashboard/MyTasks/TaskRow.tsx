import React, { useContext, useEffect, useRef, useState } from 'react';
import { HiOutlinePencil, HiX } from 'react-icons/hi';
import axios, { AxiosError } from 'axios';

import { Task } from '../../../actions/dashboard/task';
import styled from 'styled-components';
import { colors } from '../../../style/colors';
import { DashboardContext } from '../DashboardContext';
import { API_URL } from '../../../config/paths';
import { Modal } from '../../../components/Modal/Modal';
import { EditTaskForm } from './EditTaskForm';
import { UserLink } from '../../../components/UserLink';

interface TaskRowProps {
  task: Task;
  setTaskInModalId: (id: number) => void;
}

interface TRCProps {}

const CheckboxAndDescriptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-grow: 1;
`;

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserIconContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-self: stretch;
  align-items: center;
`;

const UserIconSpacerDiv = styled.div`
  width: 1px;
  background-color: ${colors.layoutGrey};
  align-self: stretch;
  margin-left: 5px;
  margin-right: 5px;
`;

const UserIconSpacer = () => <UserIconSpacerDiv>&nbsp;</UserIconSpacerDiv>;

const TaskRowContainer = styled.div<TRCProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid ${colors.layoutGrey};
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
`;

const Description = styled.div`
  font-size: 80%;
`;

const EditIcon = styled(HiOutlinePencil)`
  cursor: pointer;
`;

type DeleteIconProps = {
  triggered?: boolean;
};
const DeleteIcon = styled(HiX)<DeleteIconProps>`
  cursor: pointer;
  filter: saturate(${(props) => (props.triggered ? 1 : 0)});
  & > path {
    fill: red;
    stroke: red;
    stroke-width: ${(props) => (props.triggered ? 3 : 0)};
    transition: stroke-width 0.2s;
  }
  transition: filter 0.2s;
`;
const Actions = styled.div`
  margin-right: 1rem;

  > * {
    margin-right: 0.5rem;
  }
`;

const deleteTask = (projectId: number, taskId: number): Promise<void> => {
  return axios
    .delete(`${API_URL}/projects/${projectId}/tasks/${taskId}`, {
      withCredentials: true,
    })
    .then((resp) => {
      if (resp instanceof Error) throw resp; // ????? round2
      return resp.status < 400 ? void 0 : resp.data.message;
    })
    .catch((e: AxiosError) => {
      return e?.response?.data?.message ?? 'An error has occurred.';
    });
};

export const TaskRow: React.FC<TaskRowProps> = ({ task, setTaskInModalId }) => {
  const { id, subject, reporter, assignees } = task;
  const { currentProject, refresh } = useContext(DashboardContext);
  const [deleteTriggered, setDeleteTriggered] = useState(false);
  const timeoutRef = useRef<any>();

  useEffect(() => {
    return () => timeoutRef.current && clearTimeout(timeoutRef.current);
  }, [timeoutRef]);

  const onDeleteClick = () => {
    if (!currentProject?.id) return;

    if (!deleteTriggered) {
      setDeleteTriggered(true);
      timeoutRef.current = setTimeout(() => setDeleteTriggered(false), 3000);
    } else {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      deleteTask(currentProject.id, id).then(() => refresh());
    }
  };

  return (
    <TaskRowContainer>
      <CheckboxAndDescriptionContainer>
        <input
          type="checkbox"
          style={{
            marginRight: 10,
          }}
        />
        <Actions>
          {currentProject?.amAdmin && (
            <>
              <Modal
                title="Edit task"
                toggleButton={(showMenu) => (
                  <EditIcon
                    onClick={() => {
                      showMenu();
                      setTaskInModalId(id);
                    }}
                  />
                )}
              >
                <EditTaskForm
                  submitButtonText={'Edit task'}
                  onDone={() => console.log(1)}
                  initialData={task}
                />
              </Modal>
              <DeleteIcon triggered={deleteTriggered} onClick={onDeleteClick} />
            </>
          )}
        </Actions>
        <DescriptionContainer>
          <Title>
            {subject}
            {/* FIXME(backend): amAdmin should not be the only way to gain permission to edit/delete task */}
          </Title>
          <Description>
            #{id} &mdash; Created by {reporter?.firstName} {reporter?.lastName}
          </Description>
        </DescriptionContainer>
      </CheckboxAndDescriptionContainer>
      <UserIconContainer>
        <div>
          {assignees.map((user, index) => user && <UserLink user={user} key={index} />)}
        </div>
        <UserIconSpacer />
        <div>{reporter && <UserLink user={reporter} />}</div>
      </UserIconContainer>
    </TaskRowContainer>
  );
};
