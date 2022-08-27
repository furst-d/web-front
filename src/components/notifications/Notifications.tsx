import React from 'react';
import Menu from "../styles/material-ui/components/Menu";
import {Badge} from "@mui/material";
import styled from "styled-components";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {NotificationProp} from "../navbar/Navbar";
import NotificationPreview from "./NotificationPreview";

interface NotificationsProp {
    setOpenHamburgerMenu: (value: boolean) => void;
    notifications: NotificationProp[];
}

const Notifications = ({setOpenHamburgerMenu, notifications}: NotificationsProp) => {
    const [anchorBadge, setAnchorBadge] = React.useState<null | HTMLElement>(null);
    const openBadge = Boolean(anchorBadge);

    const handleClickBadge = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorBadge(event.currentTarget);
        setOpenHamburgerMenu(false);
    };

    const handleCloseBadge = () => {
        setAnchorBadge(null);
    };

    const handleNotifications = () => {
        return notifications.map((notification, index) => {
            return (
                <NotificationPreview key={index} data={notification} setAnchorBadge={setAnchorBadge} />
            )
        })
    }

    return (
        <>
            <CustomBadge onClick={handleClickBadge} color="primary" badgeContent={notifications.filter(notification => !notification.seen).length}  max={999}>
                <CustomNotificationIcon />
            </CustomBadge>

            <Menu
                anchorEl={anchorBadge}
                open={openBadge}
                onClose={handleCloseBadge}>
                {
                    notifications.length === 0
                        ?
                        <div>Momentálně nemáte žádná upozornění {notifications.length}</div>
                        :
                        handleNotifications()
                }

            </Menu>
        </>
    );
};

export default Notifications;

const CustomBadge = styled(Badge)`
  font-size: 50px;
  cursor: pointer;
`

const CustomNotificationIcon = styled(NotificationsIcon)`
  font-size: 50px;
`
