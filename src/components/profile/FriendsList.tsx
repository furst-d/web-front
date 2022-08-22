import React, {useEffect, useState} from 'react';
import LoadingSpinner from "../styles/material-ui/components/LoadingSpinner";
import UserTemplate from "../admin-panel/UserTemplate";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {UserProp} from "../admin-panel/UserList";
import UserListSection from "../styles/list/UserListSection";
import styled from "styled-components";

const FriendsList = () => {
    const [friends, setFriends] = useState<UserProp[]>([]);
    const [pendingFriendRequests, setPendingFriendsRequests] = useState<UserProp[]>([]);
    const [receivedFriendRequests, setReceivedFriendRequests] = useState<UserProp[]>([]);
    const [isPending, setIsPending] = useState<boolean>(true);
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        setFriends([]);
        setPendingFriendsRequests([]);
        setReceivedFriendRequests([]);
        setIsPending(false);
    }, [axiosPrivate]);


    return (
        <>
            {isPending
                ?
                <LoadingSpinner />
                :
                <FriendSectionWrapper>
                    {receivedFriendRequests.length > 0 &&
                        <UserListSection>
                            <h4>Přijaté žádosti</h4>
                            {receivedFriendRequests.map((user, index) => {
                                return (
                                    <UserTemplate key={index} data={user} />
                                )
                            })}
                        </UserListSection>
                    }

                    {pendingFriendRequests.length > 0 &&
                        <UserListSection>
                            <h4>Čekající žádosti</h4>
                            {pendingFriendRequests.map((user, index) => {
                                return (
                                    <UserTemplate key={index} data={user} />
                                )
                            })}
                        </UserListSection>
                    }

                    <UserListSection>
                        <h4>Seznam přátel</h4>
                        {friends.length > 0 ?
                            friends.map((user, index) => {
                                    return (
                                        <UserTemplate key={index} data={user} />
                                    )
                                })
                            :
                            <div>Seznam přátel je prázdný</div>
                        }
                    </UserListSection>
                </FriendSectionWrapper>

            }
        </>
    );
};

export default FriendsList;

const FriendSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`
