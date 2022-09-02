import React, {useState} from 'react';
import {Form} from "../../styles/form/Form";
import TextField from "../../styles/material-ui/components/input/TextField";
import {
    DialogContent,
    FormControl, SelectChangeEvent,
} from "@mui/material";
import ErrorForm from "../../form/ErrorForm";
import Button from "../../styles/material-ui/components/Button";
import MenuItem from "../../styles/material-ui/components/menu/MenuItem";
import MultiSelect from "../../styles/material-ui/components/input/MultiSelect";
import InputLabel from "../../styles/material-ui/components/input/InputLabel";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import {AllergenProps, IngredientProps} from "../../../pages/project/cookbook/IngredientsPage";
import {toast} from "react-toastify";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";

export interface EditIngredientProps {
    id: number;
    allergens: AllergenProps[];
    name: string;
    selectedAllergensNames: string[];
    ingredients: IngredientProps[];
    setIngredients: (value: IngredientProps[]) => void;
    setFilteredIngredients: (value: IngredientProps[]) => void;
    setOpenIngredientModal: (value: boolean) => void;
    edit: boolean;
}

const EditIngredient = ({allergens, ingredients, setOpenIngredientModal, selectedAllergensNames, name, edit, id,
                            setFilteredIngredients, setIngredients}: EditIngredientProps) => {
    const [ingredientName, setIngredientName] = useState<string>(name);
    const [nameError, setNameError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<string[]>([]);
    const [selectedAllergensName, setSelectedAllergensName] = useState<string[]>(selectedAllergensNames);
    const axiosPrivate = useAxiosPrivate();

    const handleAllergenChange = (event: SelectChangeEvent<unknown>) => {
        const values = event.target.value as string[];
        setSelectedAllergensName(values);
    };

    const handleError = (error: any) => {
        if(error.response) {
            if(error.response.status === 404) {
                toast.error("Chybný identifikátor požadavku");
            } else {
                toast.error("Při zpracování požadavku došlo k chybě");
            }
        }
    }

    const validateIngredient = () => {
        let error: boolean = false;
        setNameError(false);
        setErrors([]);

        if(!ingredientName) {
            error = true;
            setErrors(old => [...old, "Název suroviny musí být vyplněno"]);
            setNameError(true);
        }

        if(!error) {
            setLoading(true);
            if(edit) {
                editIngredient();
            } else {
                addIngredient();
            }
        }
    }

    const addIngredient = () => {
        const selectedAllergens = allergens.filter((allergen) => selectedAllergensName.includes(allergen.name));
        const selectedIds = selectedAllergens.map((allergen) => allergen.allergen_id);
        selectedIds.sort((a, b) => (a - b));
        const selectedIdsText = selectedIds.join(",");
        axiosPrivate.post(`/api/cookbook/ingredients`, {
            name: ingredientName,
            allergenIds: selectedIds.length > 0 ? selectedIdsText : null,
        }).then((res) => {
            ingredients.push({
                ingredient_id: res.data.inserted_id,
                name: ingredientName,
                allergens: selectedAllergens,
            })
            ingredients.sort((a, b) => (('' + a.name).localeCompare(b.name)));
            toast.success("Surovina byla přidána");
            setOpenIngredientModal(false);
        }).catch((error) => {
            if(error.response) {
                setLoading(false);
                handleError(error);
            }
        });
    }

    const editIngredient = () => {
        const selectedAllergens = allergens.filter((allergen) => selectedAllergensName.includes(allergen.name));
        const selectedIds = selectedAllergens.map((allergen) => allergen.allergen_id);
        selectedIds.sort((a, b) => (a - b));
        const selectedIdsText = selectedIds.join(",");
        axiosPrivate.put(`/api/cookbook/ingredients/${id}`, {
            name: ingredientName,
            allergenIds: selectedIds.length > 0 ? selectedIdsText : null,
        }).then(() => {
            const updatedList = ingredients.filter((ingredient) => ingredient.ingredient_id != id);
            updatedList.push({
                ingredient_id: id,
                name: ingredientName,
                allergens: selectedAllergens,
            })
            updatedList.sort((a, b) => (('' + a.name).localeCompare(b.name)));
            setFilteredIngredients(updatedList);
            setIngredients(updatedList);
            toast.success("Surovina byla upravena");
            setOpenIngredientModal(false);
        }).catch((error) => {
            if(error.response) {
                setLoading(false);
                handleError(error);
            }
        });
    }


    return (
        <DialogContent color="secondary">
            <Form>
                <TextField onChange={e => setIngredientName(e.target.value)} error={nameError} value={ingredientName} required label="Název suroviny" />
                <FormControl >
                    <InputLabel>Alergeny</InputLabel>
                    <MultiSelect
                        label="Alergeny"
                        value={selectedAllergensName}
                        onChange={handleAllergenChange}
                    >
                        {allergens.map((allergen) => (
                            <MenuItem
                                key={allergen.allergen_id}
                                value={allergen.name}
                            >
                                {allergen.name} ({allergen.allergen_id})
                            </MenuItem>
                        ))}
                    </MultiSelect>
                </FormControl>
                <ErrorForm errors={errors} />
                <Button variant="contained" loading={loading} startIcon={edit ? <EditIcon /> : <AddIcon />} loadingPosition="start" onClick={validateIngredient}>{edit ? "Upravit" : "Přidat"}</Button>
            </Form>
        </DialogContent>
    );
};

export default EditIngredient;
