

import React, { useEffect, useState } from 'react'
import { api } from '../utils/api';
import { useAtom, useSetAtom } from 'jotai';
import { userInfo } from '../shared/atom';

const useFetchUserData = () => {

    const [loading, setLoading] = useState(true);
    let setUserInfo = useSetAtom(userInfo);

    useEffect(()=>{
        fetchData();
    },[])

    const fetchData = async () => {
        try {
            setLoading(true);
            let res = await api.get("/user");
            if(res.data.success){
                setUserInfo(res.data.data)
                setLoading(false);
            }
        } catch (err) {
            // console.log("Some error:", err);
        } finally {
            setLoading(false);
        }
    };
    
    return {loading,fetch : fetchData};
}

export default useFetchUserData;
