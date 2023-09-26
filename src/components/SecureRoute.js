import React from 'react'
import UnAuthorized from '../components/UnAuthorized'
import { getCookie } from '../middleware/middleware'
import { Navigate } from 'react-router';

export default function SecureRoute({children}) {

    const isAuthenticated = () => {
        return !!getCookie('nikcookie');
    };
    
    if (!isAuthenticated()) {
        return <Navigate to="/signin" replace/>
    }

    return children;
}
