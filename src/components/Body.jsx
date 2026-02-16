
import React, { createContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import { Outlet} from 'react-router-dom'
import { api } from '../utils/api';
import useFetchUserData from '../hooks/useFetchUserData';
import useFetchTask from '../hooks/useFetchTask';
import { initialTasks } from '../utils/constants';

export let UserContext = createContext();

const Body = () => {

    let {loading, userData} = useFetchUserData();

    if(loading){
        return <div className='text-center'>Loading...</div>
    }

    return (
        <UserContext.Provider value={{userData}}>
            <div className='min-h-screen bg-linear-to-br from-slate-50 to-slate-100'>
                <Navbar />
                <Outlet />
            </div>
        </UserContext.Provider>
    )
}

export default Body;
