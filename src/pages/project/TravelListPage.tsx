import React from 'react';
import {Helmet} from "react-helmet";
import {Content} from "../../components/content/Content";

const TravelListPage = () => {
    return (
        <Content>
            <Helmet>
                <title>Cestovní seznam</title>
            </Helmet>
            Cestovní seznam
        </Content>
    );
};

export default TravelListPage;
