import React from 'react';
import {Helmet} from "react-helmet";
import {Content} from "../../components/content/Content";

const TwitchPage = () => {
    return (
        <Content>
            <Helmet>
                <title>Twitch</title>
            </Helmet>
            Twitch
        </Content>
    );
};

export default TwitchPage;
