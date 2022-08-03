import React, {useEffect} from 'react';
import {toast} from "react-toastify";

const ToastProvider: ({children}: { children: any }) => JSX.Element = ({children}) => {
    useEffect(() => {
        const toastMessage = localStorage.getItem("toast");
        if(toastMessage) {
            toast.success(toastMessage);
            localStorage.removeItem("toast");
        }
    }, []);

    return (
        <>{children}</>
    );
};

export default ToastProvider;
