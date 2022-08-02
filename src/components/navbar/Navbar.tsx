import React from 'react';
import styled from "styled-components";
import NavItemsSection from "./NavItemsSection";
import NavUserSection from "./NavUserSection";

const Navbar = () => {
    return (
        <NavWrapper>
            <NavItemsSection />
            <NavUserSection />
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
