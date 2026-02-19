
import axios from "axios";
import { logout } from "./logout";


export let BASE_URL = "http://localhost:9000/api/v1";

export const api = axios.create({
    baseURL : BASE_URL,
    withCredentials: true,
});

export const refreshApi = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

api.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


api.interceptors.response.use((response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (!error.response) {
            return Promise.reject(error);
        }

        //  DO NOT intercept refresh endpoint itself
        if (originalRequest.url.includes("/user/generate/accesstoken") || originalRequest.url.includes("/user/logout")) {
            console.log("going in between ");
            logout();
            return Promise.reject(error);
        }

        if (error.response.status === 401 && !originalRequest._retry) 
        {
            originalRequest._retry = true;

            try {
                await refreshApi.get(BASE_URL + "/user/generate/accesstoken",{ withCredentials: true });

                return api(originalRequest);
            } catch (refreshError) {
                console.log("going in actual logout ");
                logout();
                return Promise.reject(refreshError);
            }
        }
    return Promise.reject(error);
  }
);



/*
const token = localStorage.getItem("accessToken");
    console.log(token);
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
*/