import {axiosPrivate} from "../api/axios";
import {useEffect} from "react";
import {getTokens, updateAccessToken, refreshToken} from "../utils/auth/AuthManager";

const useAxiosPrivate = () => {
    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if(config.headers && !config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${getTokens().access_token}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if(error?.response?.status === 403 && !prevRequest.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refreshToken();
                    updateAccessToken(newAccessToken);
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        };
    }, [])
    

    return axiosPrivate;
}

export default useAxiosPrivate;