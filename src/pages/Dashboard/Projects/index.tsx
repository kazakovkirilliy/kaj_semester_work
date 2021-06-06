import React, { useContext } from 'react';
import styled from 'styled-components';

import { colors } from '../../../style/colors';
import { DummyButton } from '../../../style/components/DummyButton';
import { ProjectClickable } from './ProjectClickable';
import { DashboardContext } from '../DashboardContext';
import { Modal } from '../../../components/Modal/Modal';
import { CreateProjectForm } from './CreateProjectForm';
import { BsPlusCircleFill } from 'react-icons/bs';
import SubNavStyling from '../../../style/components/SubNavStyling';

export const Projects: React.FC = () => {
  const { projects, refresh } = useContext(DashboardContext);

  const postProjectCreate = () => {
    if (refresh) refresh();
  };

  return (
    <Wrapper>
      <SubNavStyling.Header>
        <SubNavStyling.Title>Projects</SubNavStyling.Title>
        <Modal
          title="Create new project"
          toggleButton={(showMenu) => (
            <CreateProjectButton onClick={showMenu}>
              <BsPlusCircleFill />
            </CreateProjectButton>
          )}
        >
          <CreateProjectForm onDone={postProjectCreate} />
        </Modal>
      </SubNavStyling.Header>
      {projects.map((proj) => (
        <ProjectClickable project={proj} key={proj.id} />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const CreateProjectButton = styled(DummyButton)`
  border-radius: 50%;
  color: ${colors.lightBlue};
  background-color: transparent;
  font-size: 3rem;
  margin-left: auto;
`;
