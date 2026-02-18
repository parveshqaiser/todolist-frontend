
import React, { createContext} from 'react'
import Navbar from './Navbar'
import { Outlet} from 'react-router-dom'
import useFetchUserData from '../hooks/useFetchUserData';

export let UserContext = createContext();

const Body = () => {

    let {loading} = useFetchUserData();
    let userData = {name : "abc", age :50};
   
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
