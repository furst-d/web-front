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

interface NavbarProp {
    pages: PageProp[]
}

const Navbar = ({pages}: NavbarProp) => {
    const [openHamburgerMenu, setOpenHamburgerMenu] = useState<boolean>(false);

    const updateOpenHamburgerMenu = (value: boolean) => {
        setOpenHamburgerMenu(value);
    }

    return (
        <NavWrapper>
            <NavItemsSection pages={pages} openHamburgerMenu={openHamburgerMenu} setOpenHamburgerMenu={updateOpenHamburgerMenu}/>
            <NavUserSection setOpenHamburgerMenu={updateOpenHamburgerMenu}/>
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
