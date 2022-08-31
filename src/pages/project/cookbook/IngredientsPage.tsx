import React, {useEffect, useState} from 'react';
import {Helmet} from "react-helmet";
import {ControlPanel, ControlPanelWrapper} from "../../../components/styles/content/Content";
import Button from "../../../components/styles/material-ui/components/Button";
import Dialog from "../../../components/styles/material-ui/components/Dialog";
import AddIngredience from "../../../components/cookbook/AddIngredient";
import IngredientList from "../../../components/cookbook/IngredientList";
import TextField from "../../../components/styles/material-ui/components/input/TextField";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

export interface IngredientProps {
    ingredient_id: number,
    name: string,
    allergenIds: string,
}

const IngredientsPage = () => {
    const [openAddIngredientModal, setOpenAddIngredientModal] = useState<boolean>(false);
    const [ingredients, setIngredients] = useState<IngredientProps[]>([]);
    const [ingredientsFiltered, setIngredientsFiltered] = useState<IngredientProps[]>([]);
    const [isPendingIngredients, setIsPendingIngredients] = useState<boolean>(true);
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        axiosPrivate.get(`/api/cookbook/ingredients`)
            .then(res => {
                setIngredients(res.data.data);
                setIngredientsFiltered(res.data.data);
                setIsPendingIngredients(false);
            })
    }, [axiosPrivate])

    return (
        <>
            <Helmet>
                <title>Suroviny - Jídelníček</title>
            </Helmet>
            <ControlPanelWrapper>
                <ControlPanel>
                    <li><Button variant="contained" color="success" onClick={() =>setOpenAddIngredientModal(true)}>Přidat surovinu</Button></li>
                    <li><Button variant="contained" color="info" onClick={() =>setOpenAddIngredientModal(true)}>Filtrovat</Button></li>
                </ControlPanel>
                <ControlPanel>
                    <li><TextField size="small"  label="Vyhledat" onChange={(e) => setIngredientsFiltered(ingredients
                        .filter((ingredient) => ingredient.name.toLowerCase()
                            .includes(e.target.value.toLowerCase())))}/></li>
                </ControlPanel>
                <Dialog open={openAddIngredientModal} onClose={() => setOpenAddIngredientModal(false)}>
                    <AddIngredience />
                </Dialog>
            </ControlPanelWrapper>
            <IngredientList />
            {ingredientsFiltered.map((ingredient, index) => {
                return (
                    <div key={index}>{ingredient.name}</div>
                )
            })}
        </>
    );
};

export default IngredientsPage;
