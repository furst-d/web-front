import React from 'react';
import Login from "../login/Login";

const AuthProvider: ({children}: { children: any }) => JSX.Element = ({children}) => {
    const checkAuth = () => {
        return false;
    }

    return (
        <>
            {checkAuth() ? children : <Login />}
        </>
    );
};

export default AuthProvider;
