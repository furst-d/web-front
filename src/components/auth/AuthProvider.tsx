import React from 'react';
import Login from "../login/Login";
import {decrypt} from "../../utils/crypto/cryptoManager";
import { isExpired } from "react-jwt";

const AuthProvider: ({children}: { children: any }) => JSX.Element = ({children}) => {
    const checkAuth = () => {
        const token = localStorage.getItem("auth_token");
        if(token) {
            const refreshToken = JSON.parse(decrypt(token)).refresh_token;
            if(isExpired(refreshToken)) {
                localStorage.removeItem("auth_token");
                return false;
            }
            return true;
        }
        return false;
    }

    return (
        <>
            {checkAuth() ? children : <Login />}
        </>
    );
};

export default AuthProvider;
