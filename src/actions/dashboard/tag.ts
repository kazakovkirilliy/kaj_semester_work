import axios from "axios";
import { API_URL } from "../../config/paths";

export type Tag = {
    id: number;
    title: string;
};

export const getTagsInProject = async(projectId: number) => {
    return axios.get(API_URL + `/projects/${projectId}/tags/`, {
        withCredentials: true,
    });
}

export const setTagsToTimerecord = async(projectId: number, timerecordId: number, tags: Tag[]) => {
    return axios.put(API_URL + `/projects/${projectId}/timerecords/${timerecordId}/tags`, tags, {
        withCredentials: true,
    }).then(res => console.log(res));
} 