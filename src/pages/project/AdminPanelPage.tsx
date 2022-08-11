import React from 'react';
import {Helmet} from "react-helmet";
import PersonIcon from '@mui/icons-material/Person';
import {ContentWrapper, SubContent, SubMenu, SubMenuStyledLink} from "../../components/content/Content";

const AdminPanelPage = () => {
    return (
        <ContentWrapper>
            <Helmet>
                <title>Admin panel</title>
            </Helmet>
            <SubMenu>
                <li><SubMenuStyledLink to={"/"} className="link-active" ><PersonIcon /> Správa uživatelů</SubMenuStyledLink></li>
            </SubMenu>
            <SubContent>
                Admin panel
            </SubContent>
        </ContentWrapper>
    );
};

export default AdminPanelPage;
