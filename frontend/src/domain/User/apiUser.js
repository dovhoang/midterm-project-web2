import { API } from '../../config'
import axios from 'axios'

export const getUserProfile = (userId, token) => {
    return axios.get(`${API}/user/${userId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
    })
}
export const updateProfile = (userId, info) => {
    return axios.put(`${API}/user/${userId}/update`, info)
}

export const changePassword = (userId, oldPassword, newPassword) => {
    return axios.put(`${API}/user/${userId}/changepassword`, { oldPassword, newPassword })
}

