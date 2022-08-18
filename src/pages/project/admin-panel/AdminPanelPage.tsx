import React from 'react';
import {Helmet} from "react-helmet";
import PersonIcon from '@mui/icons-material/Person';
import {ContentWrapper, SubContent, SubMenu, SubMenuStyledLink} from "../../../components/styles/content/Content";
import {Route, Routes} from "react-router-dom";
import RedirectPage from "../../abstract/RedirectPage";
import UsersPage from "./UsersPage";

const AdminPanelPage = () => {
    return (
            <ContentWrapper>
                <Helmet>
                    <title>Admin panel</title>
                </Helmet>
                <SubMenu>
                    <li><SubMenuStyledLink to={"users"} className="link-active" ><PersonIcon /> Správa uživatelů</SubMenuStyledLink></li>
                </SubMenu>
                <SubContent>
                    <Routes>
                        <Route path="*"  element={<RedirectPage path="users" />} />
                        <Route path="users"  element={<UsersPage />} />
                    </Routes>
                </SubContent>
            </ContentWrapper>

    );
};

export default AdminPanelPage;
