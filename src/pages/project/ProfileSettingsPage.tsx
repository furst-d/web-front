import React from 'react';
import {Helmet} from "react-helmet";
import {Content} from "../../components/styles/content/Content";
import PasswordChangeForm from "../../components/settings/PasswordChangeForm";
import AvatarUploadForm from "../../components/settings/AvatarUploadForm";

const ProfileSettingsPage = () => {
    return (
        <Content>
            <Helmet>
                <title>Nastavení</title>
            </Helmet>
            <PasswordChangeForm />
            <AvatarUploadForm />
        </Content>
    );
};

export default ProfileSettingsPage;
