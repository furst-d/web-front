import React, {useEffect, useState} from 'react';
import {Helmet} from "react-helmet";
import {ControlPanel, ControlPanelWrapper} from "../../../components/styles/content/Content";
import Button from "../../../components/styles/material-ui/components/Button";
import TextField from "../../../components/styles/material-ui/components/input/TextField";
import Dialog from "../../../components/styles/material-ui/components/Dialog";
import LoadingSpinner from "../../../components/styles/material-ui/components/LoadingSpinner";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import {IngredientProps} from "./IngredientsPage";
import SideDishTemplate from "../../../components/cookbook/side-dishes/SideDishTemplate";

const SideDishPage = () => {
    const [openAddSideDishModal, setOpenAddSideDishModal] = useState<boolean>(false);
    const [sideDishes, setSideDishes] = useState<IngredientProps[]>([]);
    const [sideDishesFiltered, setSideDishesFiltered] = useState<IngredientProps[]>([]);
    const [sideDishesSearched, setSideDishesSearched] = useState<IngredientProps[]>([]);
    const [isPendingSideDishes, setIsPendingSideDishes] = useState<boolean>(true);
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        axiosPrivate.get(`/api/cookbook/ingredients`)
            .then(res => {
                setSideDishes(res.data.data);
                setSideDishesFiltered(res.data.data);
                setSideDishesSearched(res.data.data);
                setIsPendingSideDishes(false);
            });
    }, [axiosPrivate])

    return (
        <>
            <Helmet>
                <title>Přílohy - Jídelníček</title>
            </Helmet>
            <ControlPanelWrapper>
                <ControlPanel>
                    <li><Button variant="contained" color="success" onClick={() =>setOpenAddSideDishModal(true)}>Přidat přílohu</Button></li>
                    <li><Button variant="contained" color="info" onClick={() =>setOpenAddSideDishModal(true)}>Filtrovat</Button></li>
                </ControlPanel>
                <ControlPanel>
                    <li><TextField size="small"  label="Vyhledat" onChange={(e) => setSideDishesSearched(sideDishesFiltered
                        .filter((ingredient) => ingredient.name.toLowerCase()
                            .includes(e.target.value.toLowerCase())))}/></li>
                </ControlPanel>
                <Dialog open={openAddSideDishModal} onClose={() => setOpenAddSideDishModal(false)}>
                    <SideDishTemplate id={0} name={""} edit={false} />
                </Dialog>
            </ControlPanelWrapper>
            <>
                {isPendingSideDishes
                    ?
                    <LoadingSpinner />
                    :
                    <div />
                }
            </>
        </>
    );
};

export default SideDishPage;
