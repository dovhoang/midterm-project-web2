import { API } from '../../config'
import axios from 'axios'

export const getBoardsListById = (userId) => {
    return axios.get(`${API}/${userId}/boards`)
}