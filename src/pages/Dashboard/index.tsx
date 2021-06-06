import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';
import styled from 'styled-components';

import MainLayout from '../../components/layout';
import { colors } from '../../style/colors';
import { Timer } from './Timer';
import { MyTasks } from './MyTasks';
import { Projects } from './Projects';
import { devices, layoutDashboard } from '../../style/layoutConstants';
import { Project, useProjects } from './Projects/useProjects';
import { useTasks } from './MyTasks/useTasks';
import { DashboardContext } from './DashboardContext';
import { ProjectInfo } from './ProjectInfo';
import { useTags } from './TimeRecords/useTags';
import { useTimerecords } from './TimeRecords/useTimerecords';
import { Timerecords } from './TimeRecords';

export const Dashboard: React.FC<RouteComponentProps> = () => {
  const [willRefresh, setWillRefresh] = useState(false);
  const projects = useProjects(willRefresh);
  const [currentProject, setCurrentProject] = useState<Project>();
  const tasks = useTasks(currentProject?.id, willRefresh);
  const tags = useTags(currentProject?.id, willRefresh);
  const timerecords = useTimerecords(willRefresh, currentProject?.id);

  const setCurrentProjectById = (projectId: number) => {
    setCurrentProject(projects.find((proj) => proj.id === projectId));
  };
  const refresh = () => setWillRefresh(!willRefresh);

  return (
    <DashboardContext.Provider
      value={{
        projects,
        currentProject,
        setCurrentProjectById,
        refresh,
        shouldRefresh: willRefresh,
        tasks,
        timerecords,
        tags,
      }}
    >
      <MainLayout subNav={<Projects />}>
        <Wrapper>
          {currentProject ? (
            <DashboardGrid>
              <MyTasksArea>
                <ProjectInfo />
                <MyTasks />
              </MyTasksArea>
              <TimerArea>
                <Timer tasks={tasks} tags={tags} />
              </TimerArea>
              <TimerecordsArea>
                <Timerecords timerecords={timerecords} />
              </TimerecordsArea>
            </DashboardGrid>
          ) : (
            <NoProject>
              <h1>Please, select a project</h1>
            </NoProject>
          )}
        </Wrapper>
      </MainLayout>
    </DashboardContext.Provider>
  );
};

const NoProject = styled.div`
  width: 100%;
  height: 100%;
  font-size: 5rem;
  display: flex;
  justify-content: center;
  margin-top: 20vh;
  user-select: none;

  h1 {
    color: ${colors.darkGrey};
    // cra and styled components automatically add vendor prefixes, but anyways...
    @keyframes up-text {
      0% {
        -webkit-transform: translateY(0);
        transform: translateY(0);
        -webkit-transform-origin: 50% 50%;
        transform-origin: 50% 50%;
        text-shadow: none;
      }
      100% {
        -webkit-transform: translateY(-50px);
        transform: translateY(-20px);
        -webkit-transform-origin: 50% 50%;
        transform-origin: 50% 50%;
        text-shadow: 0 50px 30px rgba(0, 0, 0, 0.3);
      }
    }
    -webkit-animation: up-text 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
    animation: up-text 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  }
`;
const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;
const DashboardGrid = styled.section`
  overflow: hidden;
  display: grid;
  grid-template-areas: 'my-tasks timer' 'my-tasks timerecords';
  grid-template-columns: ${layoutDashboard.firstColWidth} ${layoutDashboard.secondColWidth};
  grid-template-rows: ${layoutDashboard.firstRowHeight} ${layoutDashboard.secondRowHeight};

  > div {
    margin: 1rem;
    padding: 2rem;
  }

  @media only screen and ${devices.large} {
    grid-template-areas: 'timer' 'timerecords';
    grid-template-columns: auto;
  }
`;

const MyTasksArea = styled.div`
  grid-area: my-tasks;

  @media only screen and ${devices.large} {
    display: none;
  }
`;

const TimerArea = styled.div`
  grid-area: timer;
  border-bottom: 2px solid ${colors.layoutGrey};
  border-radius: 2rem;
  box-shadow: 12px 10px 20px 0 ${colors.layoutGrey},
    -8px -8px 12px 0 rgba(255, 255, 255, 0.3);

  @media screen and ${devices.medium} {
    box-shadow: 0 10px 10px 0 ${colors.layoutGrey},
      -8px -8px 12px 0 rgba(255, 255, 255, 0.3);
  }
`;

const TimerecordsArea = styled.div`
  grid-area: timerecords;
  margin-bottom: 0;
`;
