

import React from 'react'
import { Navigate } from 'react-router-dom';

const PublicRoute = ({children}) => {
    
    // const [user] = useAtom(userInfo);
    let authUser = JSON.parse(localStorage.getItem("user"));

    if(authUser){
        return <Navigate to="/home" replace />;
    }

    return children;
}

export default PublicRoute;
