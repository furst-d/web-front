import React, {useState} from 'react';
import Button from "../styles/material-ui/components/Button";
import Dialog from "../styles/material-ui/components/Dialog";
import ConfirmationDialog from "../dialog/ConfirmationDialog";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {toast} from "react-toastify";

import {
    ButtonSection,
} from "../styles/list/UserList";
import {AllergenProps, IngredientProps} from "../../pages/project/cookbook/IngredientsPage";
import {ListTemplateSection} from "../styles/list/List";
import {Tooltip} from "@mui/material";
import IngredientTemplate from "./IngredientTemplate";

interface IngredientPreviewProp {
    data: IngredientProps;
    allergens: AllergenProps[];
    ingredients: IngredientProps[];
    setIngredients: (value: IngredientProps[]) => void;
    setFilteredIngredients: (value: IngredientProps[]) => void;
}

const IngredientPreview = ({data, allergens, ingredients, setIngredients, setFilteredIngredients}: IngredientPreviewProp) => {
    const [openEditModal, setOpenEditModal] = useState<boolean>(false);
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
    const axiosPrivate = useAxiosPrivate();

    const handleError = (error: any) => {
        if(error.response) {
            if(error.response.status === 404) {
                toast.error("Chybný identifikátor požadavku");
            } else {
                toast.error("Při zpracování požadavku došlo k chybě");
            }
        }
    }

    const removeIngredient = () => {
        axiosPrivate.delete(`/api/cookbook/ingredients/${data.ingredient_id}`)
            .then(() => {
                const updatedList = ingredients.filter((ingredient) => ingredient.ingredient_id != data.ingredient_id);
                setIngredients(updatedList);
                setFilteredIngredients(updatedList);
                toast.success("Surovina byla odstraněna");
                setOpenDeleteModal(false);
            }).catch((error) => {
            handleError(error);
        });
    }

    return (
        <ListTemplateSection>
            <div>
                {data.name}
                {
                    data.allergens != null && data.allergens.length > 0 &&
                    <Tooltip title={data.allergens.map((allergen) => allergen.name).join(", ")}>
                        <span> ({data.allergens.map((allergen) => allergen.allergen_id).join(", ")})</span>
                    </Tooltip>
                }
            </div>
            <ButtonSection>
                <Button size="small" variant="contained" color="info" onClick={() => setOpenEditModal(true)}>Upravit</Button>
                <Button size="small" variant="contained" color="error" onClick={() => setOpenDeleteModal(true)}>Odstranit</Button>
            </ButtonSection>
            <Dialog open={openEditModal} onClose={() => setOpenEditModal(false)}>
                <IngredientTemplate allergens={allergens} ingredients={ingredients}
                                    selectedAllergensNames={data.allergens != null ? data.allergens.map((allergen) => allergen.name) : []}
                                    name={data.name} edit={true} id={data.ingredient_id} setOpenIngredientModal={setOpenEditModal}
                                    setIngredients={setIngredients} setFilteredIngredients={setFilteredIngredients} />
            </Dialog>
            <Dialog open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
                <ConfirmationDialog content={`Opravdu si přejete odebrat surovinu ${data.name}?`} onAccept={removeIngredient} onClose={() => setOpenDeleteModal(false)} />
            </Dialog>
        </ListTemplateSection>
    );
};

export default IngredientPreview;

