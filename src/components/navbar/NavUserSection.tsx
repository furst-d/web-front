import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import styled from "styled-components";
import {Badge, MenuItem} from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import Menu from "../material-ui/components/Menu";
import Divider from "../material-ui/components/Divider";

interface NavUserSectionProp {
    setOpenHamburgerMenu: (value: boolean) => void;
}

const NavUserSection = ({ setOpenHamburgerMenu}: NavUserSectionProp) => {
    const [anchorProfile, setAnchorProfile] = React.useState<null | HTMLElement>(null);
    const openProfile = Boolean(anchorProfile);
    const [anchorBadge, setAnchorBadge] = React.useState<null | HTMLElement>(null);
    const openBadge = Boolean(anchorBadge);

    const handleClickProfile = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorProfile(event.currentTarget);
        setOpenHamburgerMenu(false);
    };
    const handleCloseProfile = () => {
        setAnchorProfile(null);
    };

    const handleClickBadge = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorBadge(event.currentTarget);
        setOpenHamburgerMenu(false);
    };
    const handleCloseBadge = () => {
        setAnchorBadge(null);
    };

    return (
        <UserSection>
            <CustomBadge onClick={handleClickBadge} color="primary" badgeContent={1}  max={999}>
                <CustomNotificationIcon />
            </CustomBadge>

            <Menu
                anchorEl={anchorBadge}
                open={openBadge}
                onClose={handleCloseBadge}>
                <MenuItem onClick={handleCloseBadge} disableRipple>
                    Momentálně nemáte žádná upozornění
                </MenuItem>
            </Menu>

            <CustomAvatar onClick={handleClickProfile}></CustomAvatar>
            <Menu
                anchorEl={anchorProfile}
                open={openProfile}
                onClose={handleCloseProfile}>
                <MenuItem onClick={handleCloseProfile} disableRipple>
                    <AccountBoxIcon />
                    Profil
                </MenuItem>
                <MenuItem onClick={handleCloseProfile} disableRipple>
                    <SettingsIcon />
                    Nastavení
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleCloseProfile} disableRipple>
                    <LogoutIcon style={{color: "red"}} />
                    <span style={{color: "red"}}> Odhlásit se</span>
                </MenuItem>
            </Menu>
        </UserSection>
    );
}

export default NavUserSection;

const UserSection = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`

const CustomAvatar = styled(Avatar)`
  width: 20px;
  height: 20px;
  margin-right: 15px;
  cursor: pointer;
`

const CustomBadge = styled(Badge)`
  font-size: 50px;
  cursor: pointer;
`

const CustomNotificationIcon = styled(NotificationsIcon)`
  font-size: 50px;
`