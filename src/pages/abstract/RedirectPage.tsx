import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";

interface RedirectPageProp {
    path: string
}

const RedirectPage = ({path}: RedirectPageProp) => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate(path);
    }, [navigate, path])

    return (
        <></>
    );
};

export default RedirectPage;
