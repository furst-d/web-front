import React from 'react';
import {Helmet} from "react-helmet";
import {Content} from "../../components/content/Content";

const ProfileSettingsPage = () => {
    return (
        <Content>
            <Helmet>
                <title>Nastavení</title>
            </Helmet>
            Nastavení
        </Content>
    );
};

export default ProfileSettingsPage;
