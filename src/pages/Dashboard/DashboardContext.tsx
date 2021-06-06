import React, { createContext, Dispatch, SetStateAction } from 'react';

import { Project } from './Projects/useProjects';
import { Task } from '../../actions/dashboard/task';
import { Timerecord } from '../../actions/dashboard/timerecord';
import { Tag } from '../../actions/dashboard/tag';

type DashboardContextShape = {
  projects: Project[];
  currentProject?: Project;
  setCurrentProjectById: (projectId: number) => void;
  tasks: Task[];
  timerecords: Timerecord[];
  tags: Tag[];
  refresh: () => void;
  shouldRefresh: boolean;
};

export const DashboardContext = createContext<DashboardContextShape>({
  projects: [],
  setCurrentProjectById: () => {},
  tasks: [],
  timerecords: [],
  tags: [],
  shouldRefresh: false,
  refresh: () => {},
});
