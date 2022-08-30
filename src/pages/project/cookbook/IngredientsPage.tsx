import React, {useState} from 'react';
import {Helmet} from "react-helmet";
import {ControlPanel, ControlPanelWrapper} from "../../../components/styles/content/Content";
import Button from "../../../components/styles/material-ui/components/Button";
import Dialog from "../../../components/styles/material-ui/components/Dialog";
import AddIngredience from "../../../components/cookbook/AddIngredient";
import IngredientList from "../../../components/cookbook/IngredientList";

const IngredientsPage = () => {
    const [openAddIngredientModal, setOpenAddIngredientModal] = useState<boolean>(false);

    return (
        <>
            <Helmet>
                <title>Suroviny - Jídelníček</title>
            </Helmet>
            <ControlPanelWrapper>
                <ControlPanel>
                    <li><Button variant="contained" color="success" onClick={() =>setOpenAddIngredientModal(true)}>Přidat surovinu</Button></li>
                </ControlPanel>
                <Dialog open={openAddIngredientModal} onClose={() => setOpenAddIngredientModal(false)}>
                    <AddIngredience />
                </Dialog>
            </ControlPanelWrapper>
            <IngredientList />
        </>
    );
};

export default IngredientsPage;
