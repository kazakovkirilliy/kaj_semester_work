import axios from 'axios';

import { API_URL } from '../../config/paths';
import { User } from '../../context/auth/state';

export type Task = {
  id: number;
  subject: string;
  description: string;
  estimatedHours: number;
  priority: string;
  dueDate: string;
  createdAt: string;
  reporter: User;
  assignees: User[];
};

// TODO: remove
export const getTasksInProject = async (projectId: number) => {
  return axios.get(API_URL + `/projects/${projectId}/tasks/`, {
    withCredentials: true,
  });
};
