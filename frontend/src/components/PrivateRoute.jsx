import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoute() {
    const {authState} = useAuth();
    const {isAuthenticated, isLoading} = authState;


    if(isLoading){
        return <h1>Loading.....</h1>
    }
    console.log(isAuthenticated);
    
    return isAuthenticated ? <Outlet/> : <Navigate to='/login' />
}

export default PrivateRoute;
