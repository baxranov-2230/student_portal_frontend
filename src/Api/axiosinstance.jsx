import axios from "axios";

import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL;

import {jwtDecode} from "jwt-decode";
import {Navigate} from "react-router-dom";
import React from "react";

// import {refreshAccessToken} from "./LoginApi.jsx";

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    withCredentials: true,
});

export const isTokenExpired = (token) => {
    if (!token) return true;
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
};

axiosInstance.interceptors.request.use(async (config) => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (
        token &&
        token.access_token
        // !isTokenExpiredRefesh(token.refresh_token)
    ) {
        if (isTokenExpired(token.access_token)) {
            // const newAccessToken = await refreshAccessToken(token.refresh_token);
            // config.headers.Authorization = `Bearer ${newAccessToken}`;
            localStorage.removeItem("token");
            return <Navigate to="/login" state={{from: location}} replace/>;
        } else {
            config.headers.Authorization = `Bearer ${token.access_token}`;
        }
    } else {
        // toast.error("Token davri tugadi");
        // await logout();
        // window.location.href = "/login";
        localStorage.removeItem("token");
        return <Navigate to="/login" state={{from: location}} replace/>;
    }

    return config;
}, Promise.reject);

export default axiosInstance;
