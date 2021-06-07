import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../../config/paths';
import { Tag } from '../../../actions/dashboard/tag';

export const useTags = (projectId: number | undefined, refresh: boolean): Tag[] => {
  const [data, setData] = useState();

  useEffect(() => {
    if (!projectId) return;

    axios
      .get(API_URL + `/projects/${projectId}/tags/`, {
        withCredentials: true,
      })
      .then(({ data }) => {
        setData(data);
      });
  }, [projectId, refresh]);

  return data || [];
};
