import styled from 'styled-components';
import React, { useContext } from 'react';

import { colors } from '../../../style/colors';
import { Project } from './useProjects';
import { DashboardContext } from '../DashboardContext';
import axios, { AxiosError } from 'axios';
import { API_URL } from '../../../config/paths';
import { ConfirmModal } from '../../../components/Modal/ConfirmModal';
import { HiTrash } from 'react-icons/hi';
import { DummyButton } from '../../../style/components/DummyButton';

type PCCProps = {
  active: boolean;
};

const ClickableWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  line-height: 1.5em;
`;

const ProjectClickableContainer = styled.div<PCCProps>`
  cursor: pointer;
  padding: 0.5rem 0.5rem 0.5rem 1rem;
  background-color: ${(props) => (props.active ? colors.link.background : 'initial')};
  color: ${(props) => (props.active ? colors.link.active : 'initial')};
  height: 6rem;
  display: grid;
  width: 100%;
  grid-template-columns: 0.8fr 0.2fr;
  align-items: center;
  button {
    display: ${(props) => (props.active ? 'block' : 'none')};
  }
`;

const RemoveProjectBtn = styled(DummyButton)`
  display: flex;
  background-color: transparent;
  margin-left: auto;
  padding: 0.8rem;
  font-size: 2rem;
  color: ${colors.link.active};
`;

type PCProps = {
  project: Project;
};

const deleteProject = (projectId: number): Promise<void> => {
  return axios
    .delete(`${API_URL}/projects/${projectId}`, {
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

export const ProjectClickable: React.FC<PCProps> = ({ project }) => {
  const { setCurrentProjectById, currentProject, refresh } = useContext(DashboardContext);

  const doDelete = () => {
    // leave the original event to close and unlisten
    deleteProject(project.id).then(() => refresh());
  };

  return (
    <ClickableWrapper>
      <ProjectClickableContainer
        active={project.id === currentProject?.id}
        onClick={() => setCurrentProjectById(project.id)}
      >
        {project.title}
        {project?.amAdmin && (
          <ConfirmModal
            title={'Delete this project?'}
            onConfirm={doDelete}
            toggleButton={(openModal) => (
              <RemoveProjectBtn onClick={openModal}>
                <HiTrash />
              </RemoveProjectBtn>
            )}
          />
        )}
      </ProjectClickableContainer>
    </ClickableWrapper>
  );
};
