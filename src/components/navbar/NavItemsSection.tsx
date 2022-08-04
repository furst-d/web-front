import React from 'react';
import styled from "styled-components";
import HamburgerMenu from "../material-ui/icons/HamburgerMenu";
import BurgerNav from "./BurgerNav";
import CloseButton from "../material-ui/icons/CloseButton";
import RestaurantIcon from '@mui/icons-material/Restaurant';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import CastIcon from '@mui/icons-material/Cast';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import NavItemsWrapper from "./NavItemsWrapper";

interface NavItemsSectionProp {
    openHamburgerMenu: boolean;
    setOpenHamburgerMenu: (value: boolean) => void;
}

const NavItemsSection = ({openHamburgerMenu, setOpenHamburgerMenu}: NavItemsSectionProp) => {
    return (
        <Header>
            <HamburgerMenu onClick={() => {
                setOpenHamburgerMenu(true);
            }} />
            <BurgerNav show={openHamburgerMenu}>
                <CloseButtonWrapper>
                    <CloseButton onClick={() => setOpenHamburgerMenu(false)} />
                </CloseButtonWrapper>
                <li><NavItemsWrapper><RestaurantIcon /> Jídelníček</NavItemsWrapper></li>
                <li><NavItemsWrapper><ViewInArIcon /> Minecraft list</NavItemsWrapper></li>
                <li><NavItemsWrapper><CastIcon /> Twitch</NavItemsWrapper></li>
                <li><NavItemsWrapper><FormatListBulletedIcon /> Zápisník</NavItemsWrapper></li>
                <li><NavItemsWrapper><AdminPanelSettingsIcon /> Admin panel</NavItemsWrapper></li>
            </BurgerNav>
            <Menu>
                <li><NavItemsWrapper><RestaurantIcon /> Jídelníček</NavItemsWrapper></li>
                <li><NavItemsWrapper><ViewInArIcon /> Minecraft list</NavItemsWrapper></li>
                <li><NavItemsWrapper><CastIcon /> Twitch</NavItemsWrapper></li>
                <li><NavItemsWrapper><FormatListBulletedIcon /> Zápisník</NavItemsWrapper></li>
                <li><NavItemsWrapper><AdminPanelSettingsIcon /> Admin panel</NavItemsWrapper></li>
            </Menu>
        </Header>
    );
};

export default NavItemsSection;

const Header = styled.div`
  display: flex;
  align-items: center;
`

const Menu = styled.ul`
  display: none;

  @media (min-width: 768px) {
    display: flex;
    list-style-type: none;
  }
`
const CloseButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`

