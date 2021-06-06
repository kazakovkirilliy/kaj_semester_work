import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../../config/paths';
import { Task } from '../../../actions/dashboard/task';

export const useTasks = (projectId: number | undefined, willRefresh: boolean): Task[] => {
  const [data, setData] = useState();
  useEffect(() => {
    if (!projectId) return;

    axios
      .get(`${API_URL}/projects/${projectId}/tasks`, {
        withCredentials: true,
      })
      .then(({ data }) => {
        setData(data);
      });
  }, [projectId, willRefresh]);

  return data || [];
};
