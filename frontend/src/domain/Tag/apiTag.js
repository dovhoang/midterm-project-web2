import { API } from '../../config'
import axios from 'axios'

export const getTagsListByBoardId = (boardId, tagType) => {
    return axios.get(`${API}/board/${boardId}?type=${tagType}`)
}

export const createTag = (content, type, boardId) => {
    return axios.post(`${API}/board/${boardId}/tag/create`, { content, type })
}

export const deleteTag = (tagId) => {
    return axios.delete(`${API}/tag/${tagId}/delete`);
}

export const updateTag = (tagId, content) => {
    return axios.put(`${API}/tag/${tagId}/update`, { content });
}