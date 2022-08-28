import React from 'react';
import {Helmet} from "react-helmet";
import PersonIcon from '@mui/icons-material/Person';
import {ContentWrapper, SubContent, SubMenu, SubMenuStyledLink} from "../../../components/styles/content/Content";
import UsersPage from "./UsersPage";

const AdminPanelPage = () => {
    return (
            <ContentWrapper>
                <Helmet>
                    <title>Admin panel</title>
                </Helmet>
                <SubMenu>
                    <li><SubMenuStyledLink to={"/admin-panel/users"} className="link-active" ><PersonIcon /> Správa uživatelů</SubMenuStyledLink></li>
                </SubMenu>
                <SubContent>
                    <UsersPage />
                </SubContent>
            </ContentWrapper>

    );
};

export default AdminPanelPage;
