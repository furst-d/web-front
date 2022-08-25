import React, {useEffect, useState} from 'react';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import LoadingSpinner from "../styles/material-ui/components/LoadingSpinner";
import UserTemplate from "./UserTemplate";
import {UserListSection} from "../styles/list/UserList";

export interface UserProp {
    user_id: number,
    email: string,
    first_name: string,
    last_name: string,
    activated: number,
    permitted_pages_id: string,
    avatar: string
}

const UserList = () => {
    const [users, setUsers] = useState<UserProp[]>([]);
    const [isPending, setIsPending] = useState<boolean>(true);
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        axiosPrivate.get(`/api/users`)
            .then(res => {
                setUsers(res.data.data);
                setIsPending(false);
            })
    }, [axiosPrivate])

    return (
        <>
            {isPending
                ?
                <LoadingSpinner />
                :
                <UserListSection>
                    {users.map((user, index) => {
                        return (
                            <UserTemplate key={index} data={user} />
                        )
                    })}
                </UserListSection>
            }
        </>
    );
};

export default UserList;


