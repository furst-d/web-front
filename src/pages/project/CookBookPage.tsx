import React from 'react';
import {Helmet} from "react-helmet";
import {Content} from "../../components/styles/content/Content";

const CookBookPage = () => {
    return (
            <Content>
                <Helmet>
                    <title>Jídelníček</title>
                </Helmet>
                Jídelníček
            </Content>
    );
};

export default CookBookPage;

