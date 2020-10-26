import { API } from '../../config'
import axios from 'axios'

export const getUserProfile = (userId) => {
    return axios.get(`${API}/user/${userId}`)
}

