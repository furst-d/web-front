import React from 'react';
import styled from "styled-components";

const NavItemsSection = () => {
    return (
        <Menu>
            <MenuItem>Test</MenuItem>
            <MenuItem>Test 1</MenuItem>
            <MenuItem>Test 2</MenuItem>
            <MenuItem>Test 3</MenuItem>
        </Menu>
    );
};

export default NavItemsSection;

const Menu = styled.ul`
  display: flex;
  list-style-type: none;
`

const MenuItem = styled.li`
  padding: 15px;

  &:hover {
    background-color: ${p => p.theme.primary};
  }
`

