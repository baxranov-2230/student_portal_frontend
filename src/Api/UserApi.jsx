
import axios from "axios";
import axiosInstance from "./axiosinstance.jsx";
// const API_URL =  'http://127.0.0.1:8000';
const API_URL =  import.meta.env.VITE_API_URL;


export const detailUser = async () => {
    const user = await axiosInstance.get(`${API_URL}/user/me`, {});

    return user.data;
};