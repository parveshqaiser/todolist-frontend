

import { createContext, useState, useEffect } from "react";
import { api, refreshApi } from "./api";
import { useNavigate } from "react-router-dom";
import { setLogoutHandler } from "./authService";
import toast from "react-hot-toast";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const navigate = useNavigate();

    console.log("from auth content ", isAuthenticated);

    let logout = async () => {
        try {
            let res = await refreshApi.get("/user/logout");
            if(res.data.success){
                toast.success(res.data.message);
            }
        } catch (error) {
             toast.error(error?.response?.data?.message || error?.message, {duration:2000})
        } finally {
            setIsAuthenticated(false);
            navigate("/");
        }
    };

    useEffect(() => {
        setLogoutHandler(() => logout);
    },[logout]);    

    return (
        <AuthContext.Provider value={{isAuthenticated,setIsAuthenticated,logout}}>
            {children}
        </AuthContext.Provider>
    );
};
