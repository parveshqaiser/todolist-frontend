
import React, { createContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import { Outlet} from 'react-router-dom'
import { api } from '../utils/api';

export let UserContext = createContext();

const Body = () => {

    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
       const checkAuth = async () => {
            try {
                setLoading(true);
                let res = await api.get("/user");
                if(res.data.success){
                    console.log(res.data.data)
                    setUserData(res.data.data);
                }
            } catch(err){
                console.log("some err", err)
            }finally{
                setLoading(false);
            }
        };
        checkAuth();  
    }, []);

    if(loading){
        return <div className='text-center'>Loading...</div>
    }

    return (
        <UserContext.Provider value={userData}>
            <div className='min-h-screen bg-linear-to-br from-slate-50 to-slate-100'>
                <Navbar />
                <Outlet />
            </div>
        </UserContext.Provider>
    )
}

export default Body;
