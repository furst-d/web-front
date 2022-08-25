import React, {useEffect, useState} from 'react';
import LoadingSpinner from "../styles/material-ui/components/LoadingSpinner";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import styled from "styled-components";
import {getUserData} from "../../utils/auth/AuthManager";
import FriendPreview from "./FriendPreview";
import {UserListSection} from "../styles/list/UserList";
import ReceivedFriendRequestsPreview from "./ReceivedFriendRequestsPreview";
import PendingFriendRequestsPreview from "./PendingFriendRequestsPreview";

export interface FriendProp {
    requestId: number,
    userId: number,
    email: string,
    name: string,
    lastName: string,
    avatar: string,
}

const FriendsList = () => {
    const [friends, setFriends] = useState<FriendProp[]>([]);
    const [pendingFriendRequests, setPendingFriendsRequests] = useState<FriendProp[]>([]);
    const [receivedFriendRequests, setReceivedFriendRequests] = useState<FriendProp[]>([]);
    const [isPending, setIsPending] = useState<boolean>(true);
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        axiosPrivate.get(`/api/users/friend-requests`)
            .then(res => {
                handleFriendRequests(res.data.data);
                setIsPending(false);
            })
    }, [axiosPrivate]);

    const handleFriendRequests = (friendRequests: any[]) => {
        const id = getUserData().id;
        const friendsLoc: FriendProp[] = [];
        const pendingFriendsLoc: FriendProp[] = [];
        const receivedFriendsLoc: FriendProp[] = [];
        friendRequests.forEach(friend => {
            if(friend.status === "PENDING") {
                if(friend.sender_id === id) {
                    pendingFriendsLoc.push({
                        requestId: friend.request_id,
                        userId: friend.recipient_id,
                        email: friend.recipient_email,
                        name: friend.recipient_name,
                        lastName: friend.recipient_lastname,
                        avatar: friend.recipient_avatar,
                    })
                } else {
                    receivedFriendsLoc.push({
                        requestId: friend.request_id,
                        userId: friend.sender_id,
                        email: friend.sender_email,
                        name: friend.sender_name,
                        lastName: friend.sender_lastname,
                        avatar: friend.sender_avatar,
                    })
                }
            } else if(friend.status === "REJECT") {
                if(friend.sender_id === id) {
                    pendingFriendsLoc.push({
                        requestId: friend.request_id,
                        userId: friend.recipient_id,
                        email: friend.recipient_email,
                        name: friend.recipient_name,
                        lastName: friend.recipient_lastname,
                        avatar: friend.recipient_avatar,
                    })
                }
            } else if(friend.status === "ACCEPT") {
                if(friend.sender_id === id) {
                    friendsLoc.push({
                        requestId: friend.request_id,
                        userId: friend.recipient_id,
                        email: friend.recipient_email,
                        name: friend.recipient_name,
                        lastName: friend.recipient_lastname,
                        avatar: friend.recipient_avatar,
                    })
                } else {
                    friendsLoc.push({
                        requestId: friend.request_id,
                        userId: friend.sender_id,
                        email: friend.sender_email,
                        name: friend.sender_name,
                        lastName: friend.sender_lastname,
                        avatar: friend.sender_avatar,
                    })
                }
            }
        })
        setFriends(friendsLoc);
        setPendingFriendsRequests(pendingFriendsLoc);
        setReceivedFriendRequests(receivedFriendsLoc);
        setIsPending(false);
    }

    const handleFriendList = () => {
        if(friends.length > 0) {
            return (
                friends.map((user, index) => {
                    return (
                        <FriendPreview key={index} data={user} />
                    )
                })
            );
        } else {
            return (<div>Seznam přátel je prázdný</div>);
        }
    }

    return (
        <>
            {isPending
                ?
                <LoadingSpinner />
                :
                <FriendSectionWrapper>
                    {receivedFriendRequests.length > 0 &&
                        <UserListSection>
                            <h4>Příjaté žádosti o přátelství</h4>
                            {receivedFriendRequests.map((user, index) => {
                                return (
                                    <ReceivedFriendRequestsPreview key={index} data={user} />
                                )
                            })}
                        </UserListSection>
                    }

                    {pendingFriendRequests.length > 0 &&
                        <UserListSection>
                            <h4>Čekající žádosti o přátelství</h4>
                            {pendingFriendRequests.map((user, index) => {
                                return (
                                    <PendingFriendRequestsPreview key={index} data={user} />
                                )
                            })}
                        </UserListSection>
                    }

                    <UserListSection>
                        <h4>Seznam přátel</h4>
                        {handleFriendList()}
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
