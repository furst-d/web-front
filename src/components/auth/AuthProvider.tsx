import React from 'react';
import Login from "../login/Login";
import { isExpired } from "react-jwt";
import {getTokens, removeTokens} from "../../utils/auth/AuthManager";
import RegistrationSettings from "./RegistrationSettings";
import { matchPath } from "react-router";

const AuthProvider: ({children}: { children: any }) => JSX.Element = ({children}) => {
    const checkAuth = () => {
        const tokens = getTokens();
        if(tokens) {
            const refreshToken = tokens.refresh_token;
            if(isExpired(refreshToken)) {
                removeTokens();
                return false;
            }
            return true;
        }
        return false;
    }

    const matchRegistration: boolean = !!matchPath(
        '/registration/:token',
        window.location.pathname,
    );

    return (
        <>
            {matchRegistration ? <RegistrationSettings /> : (checkAuth() ? children : <Login />)}
        </>
    );
};

export default AuthProvider;
