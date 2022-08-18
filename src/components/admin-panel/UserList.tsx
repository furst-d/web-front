import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import LoadingSpinner from "../styles/material-ui/components/LoadingSpinner";
import UserTemplate from "./UserTemplate";

export interface UserProp {
    user_id: number,
    first_name: string,
    last_name: string,
    activated: number,
    permitted_pages_id: string
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

const UserListSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px
`
