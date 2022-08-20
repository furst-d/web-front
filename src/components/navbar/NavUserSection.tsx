import * as React from 'react';
import styled from "styled-components";
import {Badge, MenuItem} from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import Menu from "../styles/material-ui/components/Menu";
import Divider from "../styles/material-ui/components/Divider";
import {getTokens, removeTokens} from "../../utils/auth/AuthManager"
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {NavLink, useNavigate} from "react-router-dom";
import Avatar from "../styles/material-ui/components/Avatar";

interface NavUserSectionProp {
    setOpenHamburgerMenu: (value: boolean) => void;
    avatar: string;
}

const NavUserSection = ({ setOpenHamburgerMenu, avatar}: NavUserSectionProp) => {
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();

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

    const handleLogout = () => {
        handleCloseProfile();

        axiosPrivate.delete(`/api/users/logout`, {
            data: {
                token: getTokens().refresh_token
            }
        }).then(() => {
            removeTokens();
            localStorage.setItem("toast", "Odhlášení bylo úspěšné");
            navigate("/");
            window.location.reload();
        })
    }

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

            {avatar
                ?
                <Avatar src={process.env.REACT_APP_BASE_URL + "/images/" + avatar} onClick={handleClickProfile} />
                :
                <Avatar onClick={handleClickProfile} />
            }
            <Menu
                anchorEl={anchorProfile}
                open={openProfile}
                onClose={handleCloseProfile}>
                <StyledLink to="/profile">
                    <MenuItem onClick={handleCloseProfile} disableRipple>
                        <AccountBoxIcon />Profil
                    </MenuItem>
                </StyledLink>
                <StyledLink to="/profile-settings">
                    <MenuItem onClick={handleCloseProfile} disableRipple>
                        <SettingsIcon />Nastavení
                     </MenuItem>
                </StyledLink>
                <Divider />
                <MenuItem onClick={handleLogout} disableRipple>
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
const CustomBadge = styled(Badge)`
  font-size: 50px;
  cursor: pointer;
`

const CustomNotificationIcon = styled(NotificationsIcon)`
  font-size: 50px;
`


export const StyledLink = styled(NavLink)`
  &:hover {
    background-color: ${p => p.theme.primary};
  }
  
  &:-webkit-any-link {
    color: unset;
    text-decoration: none;
  }
`