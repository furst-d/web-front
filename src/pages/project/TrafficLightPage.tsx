import React from 'react';
import {Helmet} from "react-helmet";
import {Content} from "../../components/content/Content";

const TrafficLightPage = () => {
    return (
        <Content>
            <Helmet>
                <title>Semafor</title>
            </Helmet>
            Semafor
        </Content>
    );
};

export default TrafficLightPage;
