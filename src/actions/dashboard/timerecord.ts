import axios from 'axios';
import { API_URL } from '../../config/paths';
import { User } from '../../context/auth/state';
import { setTagsToTimerecord, Tag } from './tag';

export type TimerecordPayload = {
    description?: string,
    startTime: string,
    endTime?: string | null,
    taskId?: number | string,
    tags: Tag[],
}

export type Timerecord = {
    id: number,
    author: User,
    tags: Tag[],
    startTime: string,
    endTime: string,
    description: string,
}

export const createTimerecord = async(projectId: number | undefined, timerecordPayload: TimerecordPayload) => {
    if (!projectId) return;
    return axios.post(API_URL + `/projects/${projectId}/timerecords`, timerecordPayload, {withCredentials: true}).then((res) => {
        if(res.headers.location) {
            return axios.get(res.headers.location, {withCredentials: true}).then((res) => {
                if (res.data) {
                    setTagsToTimerecord(projectId, res.data.id, timerecordPayload.tags)
                    return res.data
                }
            });
        }
    });
}

export const deleteTimerecord = async(projectId: number | undefined, timerecordId: number | undefined) => {
    if (!projectId || !timerecordId) return;
    axios.delete(API_URL + `/projects/${projectId}/timerecords/${timerecordId}`, {withCredentials: true});
}

export const updateTimerecord = async(projectId: number | undefined, timerecordId: number | undefined, timerecordPayload: TimerecordPayload) => {
    if (!projectId || !timerecordId) return;
    axios.put(API_URL + `/projects/${projectId}/timerecords/${timerecordId}`, timerecordPayload, {withCredentials: true});
    setTagsToTimerecord(projectId, timerecordId, timerecordPayload.tags)
}