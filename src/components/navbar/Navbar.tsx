import React, {useState} from 'react';
import styled from "styled-components";
import NavItemsSection from "./NavItemsSection";
import NavUserSection from "./NavUserSection";

export interface PageProp {
    page_id: number,
    path: string,
    component_name: string,
    description: string,
    icon_name: string
}

export interface NotificationProp {
    notification_id: number,
    type: string,
    content: string,
    seen: number,
    created_date: string,
}

interface NavbarProp {
    pages: PageProp[],
    notifications: NotificationProp[],
    avatar: string
}

const Navbar = ({pages, notifications, avatar}: NavbarProp) => {
    const [openHamburgerMenu, setOpenHamburgerMenu] = useState<boolean>(false);

    const updateOpenHamburgerMenu = (value: boolean) => {
        setOpenHamburgerMenu(value);
    }

    return (
        <NavWrapper>
            <NavItemsSection pages={pages} openHamburgerMenu={openHamburgerMenu} setOpenHamburgerMenu={updateOpenHamburgerMenu}/>
            <NavUserSection notifications={notifications} avatar={avatar} setOpenHamburgerMenu={updateOpenHamburgerMenu}/>
        </NavWrapper>
    );
};

export default Navbar;

const NavWrapper = styled.div`
    border-bottom: 2px solid ${p => p.theme.primary};
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: center;
`
