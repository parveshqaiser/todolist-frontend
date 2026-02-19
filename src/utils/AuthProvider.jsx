

import { createContext, useState, useEffect } from "react";
import { api, refreshApi } from "./api";
import { useNavigate } from "react-router-dom";
import { setLogoutHandler } from "./authService";
import toast from "react-hot-toast";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const navigate = useNavigate();

    let logout = async () => {
        try {
            let res = await refreshApi.get("/user/logout");
            if(res.data.success){
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || error?.message, {duration:2000})
        } finally {
            navigate("/");
        }
    };

    useEffect(() => {
        setLogoutHandler(() => logout);
    },[logout]);    

    return (
        <AuthContext.Provider value={{logout}}>
            {children}
        </AuthContext.Provider>
    );
};
