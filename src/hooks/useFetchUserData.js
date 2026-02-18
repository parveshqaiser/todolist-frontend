

import React, { useEffect, useState } from 'react'
import { api } from '../utils/api';
import { useSetAtom } from 'jotai';
import { userInfo } from '../shared/atom';

const useFetchUserData = () => {

    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);
    let setUserInfo = useSetAtom(userInfo);

    useEffect(()=>{
        fetchData();
    },[])

    const fetchData = async () => {
        try {
            setLoading(true);
            let res = await api.get("/user");
            if(res.data.success){
                // setUserData(res.data.data);
                setUserInfo(res.data.data)
                setLoading(false);
            }
        } catch (err) {
            console.log("Some error:", err);
        } finally {
            setLoading(false);
        }
    };
    
    return {loading,fetch : fetchData};
}

export default useFetchUserData;
