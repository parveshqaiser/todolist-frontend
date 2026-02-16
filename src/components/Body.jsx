
import React, { createContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import { Outlet} from 'react-router-dom'
import { api } from '../utils/api';

export let UserContext = createContext();

const Body = () => {

    const [userData, setUserData] = useState(null);
    const [task, setTask] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const [userRes, todoRes] = await Promise.all([
                    api.get("/user"),
                    api.get("/task")
                ]);

                console.log("*** ", userRes.data, todoRes.data);
                if (userRes.data.success) {
                    setUserData(userRes.data.data);
                }

                if (todoRes.data.success) {
                    setTask(todoRes.data.data);
                }

            } catch (err) {
                console.log("Some error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);


    if(loading){
        return <div className='text-center'>Loading...</div>
    }

    return (
        <UserContext.Provider value={{userData, task}}>
            <div className='min-h-screen bg-linear-to-br from-slate-50 to-slate-100'>
                <Navbar />
                <Outlet />
            </div>
        </UserContext.Provider>
    )
}

export default Body;
