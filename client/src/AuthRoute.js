import React from 'react';
import {useSelector} from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const AuthRoute = (props) => {
    const {type} = props

    const auth = useSelector(state => state.auth)

    const isAuthUser = auth.isAuthenticated;

    if (type === "guest" && isAuthUser){
        return <Redirect to = "/" />
    }

    else if(type === "private" && !isAuthUser){
        return <Redirect to = "/login" />
    }
    
    return <Route {...props} />;

}

export default AuthRoute;