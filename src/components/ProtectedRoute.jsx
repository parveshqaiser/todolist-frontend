
import React, { useContext } from 'react'
import { AuthContext } from '../utils/authContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
   
    let {isAuthenticated} = useContext(AuthContext);


    console.log(" from protected route isAuthenticated : ", isAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return children;

}

export default ProtectedRoute;
