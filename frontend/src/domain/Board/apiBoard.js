import { API } from '../../config'
import axios from 'axios'

export const getBoardsListByUserId = (userId) => {
    return axios.get(`${API}/${userId}/boards`)
}

export const getBoardById = (id) => {
    return axios.get(`${API}/board/${id}`)
}

export const createBoard = (board, token) => {
    return axios.post(`${API}/board/create`, board, {
        headers: { 'Authorization': `Bearer ${token}` }
    })
}

export const deleteBoard = (boardId, token) => {
    return axios.delete(`${API}/board/${boardId}/delete`, {
        headers: { 'Authorization': `Bearer ${token}` }
    })
}

export const updateNameBoard = (boardId, name, token) => {
    return axios.put(`${API}/board/${boardId}/update`, name, {
        headers: { 'Authorization': `Bearer ${token}` }
    })
}