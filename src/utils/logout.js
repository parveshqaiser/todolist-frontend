

import { refreshApi } from "./api";
import toast from "react-hot-toast";

let isLoggingOut = false;

export const logout = async () => {
    if (isLoggingOut) return;
        isLoggingOut = true;

    try {
        let res = await refreshApi.get("/user/logout");
        if(res.data.success){
            toast.success(res.data.message)
        }
        localStorage.removeItem("user");
        localStorage.removeItem("userInfo");
    } catch (error) {
        // console.log("err ", error);
        toast.error(error?.response?.data?.message || error?.message, {duration:2000})
    } finally {
        localStorage.removeItem("user");
        localStorage.removeItem("userInfo");
        window.location.replace("/");
       
    }
};
