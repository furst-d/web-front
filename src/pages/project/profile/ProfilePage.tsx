import React from 'react';
import {Helmet} from "react-helmet";
import {
    ContentWrapper,
    SubContent,
    SubMenu,
    SubMenuStyledLink
} from "../../../components/styles/content/Content";
import PersonIcon from "@mui/icons-material/Person";
import {Route, Routes} from "react-router-dom";
import RedirectPage from "../../abstract/RedirectPage";
import InfoPage from "./InfoPage";
import FriendsPage from "./FriendsPage";
import GroupIcon from '@mui/icons-material/Group';

const ProfilePage = () => {
    return (
        <ContentWrapper>
            <Helmet>
                <title>Profil</title>
            </Helmet>
            <SubMenu>
                <li><SubMenuStyledLink to={"info"} className="link-active" ><PersonIcon /> Informace o uživateli</SubMenuStyledLink></li>
                <li><SubMenuStyledLink to={"friends"} className="link-active" ><GroupIcon /> Přátelé</SubMenuStyledLink></li>
            </SubMenu>
            <SubContent>
                <Routes>
                    <Route path="*"  element={<RedirectPage path="info" />} />
                    <Route path="info"  element={<InfoPage />} />
                    <Route path="friends"  element={<FriendsPage />} />
                </Routes>
            </SubContent>
        </ContentWrapper>
    );
};

export default ProfilePage;
