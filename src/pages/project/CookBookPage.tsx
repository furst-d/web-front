import React from 'react';
import {Helmet} from "react-helmet";
import {ContentWrapper, SubContent, SubMenu, SubMenuStyledLink} from "../../components/styles/content/Content";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import CoffeeIcon from '@mui/icons-material/Coffee';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import RiceBowlIcon from '@mui/icons-material/RiceBowl';
import styled from "styled-components";
import {Route, Routes} from "react-router-dom";
import FoodPage from "./cookbook/FoodPage";
import SideDishPage from "./cookbook/SideDishPage";
import RedirectPage from "../abstract/RedirectPage";
import IngredientsPage from "./cookbook/IngredientsPage";
import {AccordionDetails} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PersonIcon from '@mui/icons-material/Person';
import Accordion from "../../components/styles/material-ui/components/accordion/Accordion";
import AccordionSummary from "../../components/styles/material-ui/components/accordion/AccordionSummary";

const CookBookPage = () => {
    return (
        <ContentWrapper>
            <Helmet>
                <title>Jídelníček</title>
            </Helmet>
            <SubMenuWrapper>
                <SubMenu>
                    <li><SubMenuStyledLink to={"foods"} className="link-active" ><DinnerDiningIcon /> Jídla</SubMenuStyledLink></li>
                    <li><SubMenuStyledLink to={"side-dish"} className="link-active" ><RiceBowlIcon /> Přílohy</SubMenuStyledLink></li>
                    <li><SubMenuStyledLink to={"ingredients"} className="link-active" ><CoffeeIcon /> Suroviny</SubMenuStyledLink></li>
                </SubMenu>
                <SubMenu>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <IconPair><LibraryBooksIcon /> Kolekce</IconPair>
                        </AccordionSummary>
                        <AccordionDetails>
                            <li><SubMenuStyledLink to={"collections/1"} className="link-active" >Omáčky</SubMenuStyledLink></li>
                            <li><SubMenuStyledLink to={"collections/2"} className="link-active" >Dezerty</SubMenuStyledLink></li>
                            <li><SubMenuStyledLink to={"collections/3"} className="link-active" >Polévky</SubMenuStyledLink></li>
                            <li><SubMenuStyledLink to={"collections/4"} className="link-active" >Bezlaktózový</SubMenuStyledLink></li>
                            <li><SubMenuStyledLink to={"collections/5"} className="link-active" >Hlavní jídla</SubMenuStyledLink></li>
                        </AccordionDetails>
                    </Accordion>
                </SubMenu>
                <SharedUserCollection>
                    <SubMenu>
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <IconPair><PersonIcon /> Martulinka</IconPair>
                            </AccordionSummary>
                            <AccordionDetails>
                                <SharedUserCollectionFood>
                                    <li><SubMenuStyledLink to={"/admin-panel/users"} className="link-active" ><RestaurantMenuIcon /> Nezařazené</SubMenuStyledLink></li>
                                    <div>
                                        <li><SubMenuStyledLink to={"/admin-panel/users"} className="link-active" ><LibraryBooksIcon /> Omáčky</SubMenuStyledLink></li>
                                        <li><SubMenuStyledLink to={"/admin-panel/users"} className="link-active" ><LibraryBooksIcon /> Dezerty</SubMenuStyledLink></li>
                                    </div>
                                </SharedUserCollectionFood>
                            </AccordionDetails>
                        </Accordion>
                    </SubMenu>
                </SharedUserCollection>
            </SubMenuWrapper>
            <SubContent>
                <Routes>
                    <Route path="*"  element={<RedirectPage path="foods" />} />
                    <Route path="foods"  element={<FoodPage />} />
                    <Route path="side-dish"  element={<SideDishPage />} />
                    <Route path="ingredients"  element={<IngredientsPage />} />
                    <Route path="collections/1"  element={<IngredientsPage />} />
                </Routes>
            </SubContent>
        </ContentWrapper>
    );
};

export default CookBookPage;

const SubMenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;

  @media (min-width: 768px) {
    gap: 50px;
  }
`

const SharedUserCollection = styled.div`
  display: flex;
  flex-direction: column;
`

const SharedUserCollectionFood = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`
const IconPair = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px 1px;
`