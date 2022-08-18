import React from 'react';
import {Helmet} from "react-helmet";
import {Content} from "../../components/styles/content/Content";

const ProfilePage = () => {
    return (
        <Content>
            <Helmet>
                <title>Profil</title>
            </Helmet>
            Profil
        </Content>
    );
};

export default ProfilePage;
