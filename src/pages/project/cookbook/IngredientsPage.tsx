import React, {useEffect, useState} from 'react';
import {Helmet} from "react-helmet";
import {ControlPanel, ControlPanelWrapper} from "../../../components/styles/content/Content";
import Button from "../../../components/styles/material-ui/components/Button";
import Dialog from "../../../components/styles/material-ui/components/Dialog";
import IngredientList from "../../../components/cookbook/IngredientList";
import TextField from "../../../components/styles/material-ui/components/input/TextField";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import LoadingSpinner from "../../../components/styles/material-ui/components/LoadingSpinner";
import IngredientTemplate from "../../../components/cookbook/IngredientTemplate";

export interface AllergenProps {
    allergen_id: number,
    name: string,
}

export interface IngredientProps {
    ingredient_id: number,
    name: string,
    allergens: AllergenProps[],
}

const IngredientsPage = () => {
    const [openAddIngredientModal, setOpenAddIngredientModal] = useState<boolean>(false);
    const [ingredients, setIngredients] = useState<IngredientProps[]>([]);
    const [ingredientsFiltered, setIngredientsFiltered] = useState<IngredientProps[]>([]);
    const [allergens, setAllergens] = useState<AllergenProps[]>([]);
    const [isPendingAllergens, setIsPendingAllergens] = useState<boolean>(true);
    const [isPendingIngredients, setIsPendingIngredients] = useState<boolean>(true);
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        axiosPrivate.get(`/api/cookbook/allergens`)
            .then(resAllergens => {
                setAllergens(resAllergens.data.data);
                const allergensLog: AllergenProps[] = resAllergens.data.data;
                setIsPendingAllergens(false);
                axiosPrivate.get(`/api/cookbook/ingredients`)
                    .then(res => {
                        res.data.data.forEach((ingredient: any) => {
                            if(ingredient.allergen_ids != null) {
                                const allergensIdsText: string[] = ingredient.allergen_ids.split(",");
                                const allergensIds = allergensIdsText.map(allergenId => {return Number(allergenId)});
                                ingredient.allergens = allergensLog.filter((allergen) => allergensIds.includes(allergen.allergen_id));
                            } else {
                                ingredient.allergens = null;
                            }

                        })
                        setIngredients(res.data.data);
                        setIngredientsFiltered(res.data.data);
                        setIsPendingIngredients(false);
                    });
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
                </ControlPanel>
                <ControlPanel>
                    <li><TextField size="small"  label="Vyhledat" onChange={(e) => setIngredientsFiltered(ingredients
                        .filter((ingredient) => ingredient.name.toLowerCase()
                            .includes(e.target.value.toLowerCase())))}/></li>
                </ControlPanel>
                <Dialog open={openAddIngredientModal} onClose={() => setOpenAddIngredientModal(false)}>
                    <IngredientTemplate allergens={allergens} ingredients={ingredients}
                                        setOpenIngredientModal={setOpenAddIngredientModal}
                                        selectedAllergensNames={[]} name="" edit={false} id={0}
                                        setIngredients={setIngredients} setFilteredIngredients={setIngredientsFiltered} />
                </Dialog>
            </ControlPanelWrapper>
            <>
                {isPendingIngredients && isPendingAllergens
                    ?
                    <LoadingSpinner />
                    :
                    <IngredientList ingredients={ingredientsFiltered} allergens={allergens} setIngredients={setIngredients} setFilteredIngredients={setIngredientsFiltered} />
                }
            </>
        </>
    );
};

export default IngredientsPage;
