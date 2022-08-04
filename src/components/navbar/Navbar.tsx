import React, {useState} from 'react';
import styled from "styled-components";
import NavItemsSection from "./NavItemsSection";
import NavUserSection from "./NavUserSection";

const Navbar = () => {
    const [openHamburgerMenu, setOpenHamburgerMenu] = useState<boolean>(false);

    const updateOpenHamburgerMenu = (value: boolean) => {
        setOpenHamburgerMenu(value);
    }

    return (
        <NavWrapper>
            <NavItemsSection openHamburgerMenu={openHamburgerMenu} setOpenHamburgerMenu={updateOpenHamburgerMenu}/>
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
