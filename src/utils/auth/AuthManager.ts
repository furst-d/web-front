import {decrypt, encrypt} from "../crypto/cryptoManager";
import axios from "../../api/axios";
import jwt_decode from "jwt-decode";

export function removeTokens (): void {
    localStorage.removeItem("auth_token");
}

export function getUserData (): any {
    const tokens =  localStorage.getItem("auth_token");
    if(tokens) {
        const accessToken =  JSON.parse(decrypt(tokens)).access_token;
        const decoded: any = jwt_decode(accessToken);
        return decoded.user;
    }
    return null;
}

export function getTokens (): any {
    const tokens =  localStorage.getItem("auth_token");
    if(tokens) {
        return JSON.parse(decrypt(tokens));
    }
    return null;
}

export function setTokens (accessToken: string, refToken: string): void {
    const tokens = {
        access_token: accessToken,
        refresh_token: refToken
    }
    localStorage.setItem("auth_token", encrypt(JSON.stringify(tokens)));
}

export function updateAccessToken (accessToken: string): void {
    const tokens =  getTokens();
    tokens.access_token = accessToken;
    localStorage.setItem("auth_token", encrypt(JSON.stringify(tokens)));
}

export async function refreshToken() {
    const res = await axios.post(`/api/users/refresh-token`, {
        token: getTokens().refresh_token
    })
    return res.data.access_token;
}

