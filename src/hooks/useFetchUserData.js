

import React, { useEffect, useState } from 'react'
import { api } from '../utils/api';

const useFetchUserData = () => {

    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);

    useEffect(()=>{
        fetchData();
    },[])

    const fetchData = async () => {
        try {
            setLoading(true);
            let res = await api.get("/user");
            if(res.data.success){
                setUserData(res.data.data);
                setLoading(false);
            }
        } catch (err) {
            console.log("Some error:", err);
        } finally {
            setLoading(false);
        }
    };
    
    return {loading,userData};
}

export default useFetchUserData;
