import React from 'react';
import {Helmet} from "react-helmet";
import {Content} from "../../components/content/Content";

const NotFoundPage = () => {
    return (
        <Content>
            <Helmet>
                <title>Stránka nenalezena</title>
            </Helmet>
            Nenalezeno
        </Content>
    );
};

export default NotFoundPage;
