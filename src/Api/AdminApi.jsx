import axiosInstance from "./axiosinstance.jsx";

const API_URL = import.meta.env.VITE_API_URL;

import axios from "axios";

export const GetAllStudents = async () => {
    const allStudents = await axios.get(`${API_URL}/admin/get-all`);
    return allStudents.data;
};

export const detailStudent = async (studentId) => {
    const student = await axiosInstance.get(`${API_URL}/admin/get-by-id/${studentId}`, {});

    return student.data;
};