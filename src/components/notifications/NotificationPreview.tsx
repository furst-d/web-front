import React, {useEffect, useState} from 'react';
import {NotificationProp} from "../navbar/Navbar";
import styled from "styled-components";
import {NavLink} from "react-router-dom";
import AvatarNotification from "../styles/material-ui/components/avatar/AvatarNotification";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

interface NotificationPreviewProp {
    data: NotificationProp;
    setAnchorBadge: (value: null | HTMLElement) => void;
}

const NotificationPreview = ({data, setAnchorBadge}: NotificationPreviewProp, { className }: any) => {
    const [content, setContent] = useState<any>([]);
    const [message, setMessage] = useState("");
    const [redirect, setRedirect] = useState("/");
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        const contentLoc = JSON.parse(data.content);
        setContent(contentLoc);
        getMessage(contentLoc.firstname, contentLoc.lastname);
    }, [])

    const handleClick = () => {
        data.seen = 1;
        setAnchorBadge(null);
        axiosPrivate.put(`/api/users/notifications/${data.notification_id}/seen`);
    }

    const getMessage = (name: string, lastname: string) => {
        switch (data.type) {
            case "FRIEND_REQUEST_RECEIVED":
                setRedirect("/profile/friends");
                setMessage(`${name} ${lastname} vám odeslal/a žádost o přátelství!`);
                break;
            case "FRIEND_REQUEST_ACCEPT":
                setRedirect("/profile/friends");
                setMessage(`${name} ${lastname} přijal/a vaši žádost o přátelství!`);
                break;
            case "COOKBOOK_SHARE":
                setRedirect("/cookbook");
                setMessage(`${name} ${lastname} vám nasdílel/a kolekci jídelníčku!`);
                break;
        }
    }

    return (
        <div>
            <NotificationLink to={redirect} onClick={handleClick} className{...className}>
                <NotificationPreviewWrapper className={data.seen ? "seen" : "unseen"}>
                    {content.avatar
                        ?
                        <AvatarNotification src={process.env.REACT_APP_BASE_URL + "/images/" + content.avatar}/>
                        :
                        <AvatarNotification />
                    }
                    <NotificationContentSection>
                        {message}
                        <NotificationDateSection>
                            {new Date(data.created_date).toLocaleString()}
                        </NotificationDateSection>
                    </NotificationContentSection>
                </NotificationPreviewWrapper>
            </NotificationLink>
        </div>

    );
};

export default NotificationPreview;

const NotificationLink = styled(NavLink)`
  &:-webkit-any-link {
    color: unset;
    text-decoration: none;
  }
  
  .seen {
    font-weight: unset;
  }

  .unseen {
    font-weight: bold;
  }
`

const NotificationPreviewWrapper = styled.div`
  font-family: 'Open Sans', sans-serif;
  padding: 10px;
  display: flex;
  gap: 15px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${p => p.theme.primary};

  &:hover {
    background-color: ${p => p.theme.primary};
  }
`

const NotificationContentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  align-items: flex-end;
  flex-wrap: wrap;
`

const NotificationDateSection = styled.div`
  font-size: 14px;
  display: flex;
  flex-wrap: wrap;
`


