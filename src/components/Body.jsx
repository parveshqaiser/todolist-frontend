
import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'

const Body = () => {
    
    return (
        <div className='min-h-screen bg-linear-to-br from-slate-50 to-slate-100'>
            <Navbar />
            <Outlet />
        </div>
    )
}

export default Body;
