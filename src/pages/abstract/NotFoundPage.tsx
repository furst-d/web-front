import React from 'react';
import {Helmet} from "react-helmet";

const NotFoundPage = () => {
    return (
        <div>
            <Helmet>
                <title>Stránka nenalezena</title>
            </Helmet>
            Nenalezeno
        </div>
    );
};

export default NotFoundPage;
