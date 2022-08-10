import React from 'react';
import Login from "../login/Login";
import { isExpired } from "react-jwt";
import {getTokens, removeTokens} from "../../utils/auth/AuthManager";
import {Route, Routes} from "react-router-dom";
import RegistrationSettings from "./RegistrationSettings";
import { matchPath } from "react-router";

const AuthProvider: ({children}: { children: any }) => JSX.Element = ({children}) => {
    const checkAuth = () => {
        if(matchRegistration) {
            console.log("Ano")
        } else {
            console.log("Ne")
        }
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
            <Routes>
                <Route path="/registration/:token" element={<RegistrationSettings />} />
            </Routes>
            {!matchRegistration && (checkAuth() ? children : <Login />)}
        </>
    );
};

export default AuthProvider;
