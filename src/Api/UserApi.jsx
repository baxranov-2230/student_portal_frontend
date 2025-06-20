const API_URL = import.meta.env.VITE_API_URL
import axiosInstance from './axiosinstance'

export const UserMe = async () => {
    const user = await axiosInstance.get(`${API_URL}/user/me`)
    return user.data
}
