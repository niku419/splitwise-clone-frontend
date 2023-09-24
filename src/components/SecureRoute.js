import React from 'react'
import { Route } from 'react-router-dom'
import UnAuthorized from '../components/UnAuthorized'
import { getCookie } from '../middleware/middleware'

export default function SecureRoute({element: Component, ...rest}) {

    const isAuthenticated = () => {
        return !!getCookie('nikcookie');
    };

    return (
        <Route {...rest} render={
            (props) => isAuthenticated() ? ( <Component {...props} /> ) : <UnAuthorized />
        }
    />
  )
}
