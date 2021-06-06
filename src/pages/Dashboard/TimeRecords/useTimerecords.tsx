import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../../config/paths';
import { Timerecord } from '../../../actions/dashboard/timerecord';

export const useTimerecords = (
  willRefresh: boolean,
  projectId?: number,
): Timerecord[] => {
  const [data, setData] = useState();

  useEffect(() => {
    if (!projectId) return;

    axios
      .get(API_URL + `/projects/${projectId}/timerecords/my`, {
        withCredentials: true,
      })
      .then(({ data }) => {
        setData(data);
      });
  }, [projectId, willRefresh]);

  return data || [];
};
