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
import TrafficIcon from '@mui/icons-material/Traffic';
import {PageProp} from "./Navbar";

interface NavItemsSectionProp {
    pages: PageProp[]
    openHamburgerMenu: boolean;
    setOpenHamburgerMenu: (value: boolean) => void;
}

const NavItemsSection = ({pages, openHamburgerMenu, setOpenHamburgerMenu}: NavItemsSectionProp) => {

    const Icons: any = {
        "RestaurantIcon": RestaurantIcon,
        "ViewInArIcon": ViewInArIcon,
        "CastIcon": CastIcon,
        "FormatListBulletedIcon": FormatListBulletedIcon,
        "TrafficIcon": TrafficIcon,
        "AdminPanelSettingsIcon": AdminPanelSettingsIcon
    };

    const mapPages = () => {
        return pages.map((page, index) => {
            const Icon = React.createElement(Icons[page.icon_name]);
            return (
                <li key={index}><NavItemsWrapper>{Icon} {page.description} </NavItemsWrapper></li>
            )
        });
    }

    return (
        <Header>
            <HamburgerMenu onClick={() => {
                setOpenHamburgerMenu(true);
            }} />
            <BurgerNav show={openHamburgerMenu}>
                <CloseButtonWrapper>
                    <CloseButton onClick={() => setOpenHamburgerMenu(false)} />
                </CloseButtonWrapper>
                {mapPages()}
            </BurgerNav>
            <Menu>
                {mapPages()}
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

