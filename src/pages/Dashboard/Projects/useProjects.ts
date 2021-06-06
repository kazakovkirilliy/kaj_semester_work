import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../../config/paths';

export const useProjects = (willRefresh: boolean): Project[] => {
  const [data, setData] = useState();
  useEffect(() => {
    axios
      .get(`${API_URL}/projects`, {
        withCredentials: true,
      })
      .then(({ data }) => {
        setData(data);
      });
  }, [willRefresh]);
  return data || [];
};

export type Project = {
  id: number;
  title: string;
  description: string;
  clientName: string;
  hourlyRate: number;
  currency: 'CZK' | 'EUR' | 'USD';
  amAdmin?: boolean;
};
