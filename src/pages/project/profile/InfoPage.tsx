import React, {useEffect, useState} from 'react';
import {getUserData} from "../../../utils/auth/AuthManager";
import styled from "styled-components";

export interface UserTokenProp {
    id: number;
    email: string;
    name: string;
    lastname: string;
    permittedPagesId: string[];
    registered: string;
}

const InfoPage = () => {
    const [user, setUser] = useState<UserTokenProp>();

    useEffect(() => {
        const user = getUserData();
        user.registered = new Date(user.registered).toLocaleString();
        setUser(user);
    }, []);


    return (
        <>
            {user &&
                <UserInfoList>
                    <div> Email: {user.email}</div>
                    <div> Jméno: {user.name}</div>
                    <div> Příjmení: {user.lastname}</div>
                    <div> Datum registrace: {user.registered}</div>
                </UserInfoList>
            }
        </>
    );
};

export default InfoPage;

const UserInfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`
