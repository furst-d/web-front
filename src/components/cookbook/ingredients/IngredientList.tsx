import React from 'react';
import {AllergenProps, IngredientProps} from "../../../pages/project/cookbook/IngredientsPage";
import IngredientPreview from "./IngredientPreview";
import {ListSection} from "../../styles/list/List";

interface IngredientListProps {
    ingredients: IngredientProps[],
    allergens: AllergenProps[],
    setIngredients: (value: IngredientProps[]) => void;
    setFilteredIngredients: (value: IngredientProps[]) => void;
}

const IngredientList = ({ingredients, allergens, setIngredients, setFilteredIngredients}: IngredientListProps) => {
    return (
        <ListSection>
            {ingredients.map((ingredient, index) => {
                return (
                    <IngredientPreview key={index} data={ingredient} allergens={allergens} ingredients={ingredients} setIngredients={setIngredients} setFilteredIngredients={setFilteredIngredients} />
                )
            })}
        </ListSection>
    );
};

export default IngredientList;
