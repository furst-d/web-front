import React, {useState} from 'react';
import {Helmet} from "react-helmet";
import {ControlPanel, ControlPanelWrapper} from "../../../components/styles/content/Content";
import Button from "../../../components/styles/material-ui/components/Button";
import TextField from "../../../components/styles/material-ui/components/input/TextField";
import Dialog from "../../../components/styles/material-ui/components/Dialog";

const FoodPage = () => {
    const [openAddFoodModal, setOpenAddFoodModal] = useState<boolean>(false);

    return (
        <>
            <Helmet>
                <title>Jídla - Jídelníček</title>
            </Helmet>
            <ControlPanelWrapper>
                <ControlPanel>
                    <li><Button variant="contained" color="success" onClick={() =>setOpenAddFoodModal(true)}>Přidat jídlo</Button></li>
                    <li><Button variant="contained" color="info" onClick={() =>setOpenAddFoodModal(true)}>Filtrovat</Button></li>
                </ControlPanel>
                <ControlPanel>
                    <li><TextField size="small"  label="Vyhledat" /></li>
                </ControlPanel>
                <Dialog open={openAddFoodModal} onClose={() => setOpenAddFoodModal(false)}>
                    <></>
                </Dialog>
            </ControlPanelWrapper>
        </>
    );
};

export default FoodPage;
