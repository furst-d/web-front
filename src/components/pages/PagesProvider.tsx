import React, {useEffect, useState} from 'react';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Navbar from "../navbar/Navbar";

const PagesProvider = () => {
    const [pages, setPages] = useState([]);
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        axiosPrivate.get(`/api/users/pages`)
            .then(res => {
                setPages(res.data.data);
            })
    }, [])

    return (
        <>
            <Navbar pages={pages} />
        </>
    );
};

export default PagesProvider;
