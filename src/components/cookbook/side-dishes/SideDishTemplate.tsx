import React, {useState} from 'react';
import {Form} from "../../styles/form/Form";
import TextField from "../../styles/material-ui/components/input/TextField";
import {DialogContent, FormControl, InputAdornment, OutlinedInput} from "@mui/material";
import ErrorForm from "../../form/ErrorForm";
import Button from "../../styles/material-ui/components/Button";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import {toast} from "react-toastify";
import InputLabel from "../../styles/material-ui/components/input/InputLabel";
import MultiSelect from "../../styles/material-ui/components/input/MultiSelect";
import MenuItem from "../../styles/material-ui/components/menu/MenuItem";
import styled from "styled-components";

export interface SideDishTemplateProps {
    id: number;
    name: string;
    edit: boolean;
    /*sideDishes: IngredientProps[];
    setIngredients: (value: IngredientProps[]) => void;
    setSearchedSideDishes: (value: IngredientProps[]) => void;
    setFilteredSideDishes: (value: IngredientProps[]) => void;
    setOpenSideDishModal: (value: boolean) => void; */
}

const SideDishTemplate = ({id, name, edit}: SideDishTemplateProps) => {
    const [sideDishName, setSideDishName] = useState<string>(name);
    const [nameError, setNameError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<string[]>([]);
    const [ingredients, setIngredients] = useState<number[]>([]);
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

    const validateIngredient = () => {
        let error: boolean = false;
        setNameError(false);
        setErrors([]);

        if(!sideDishName) {
            error = true;
            setErrors(old => [...old, "Název suroviny musí být vyplněno"]);
            setNameError(true);
        }

        if(!error) {
            setLoading(true);
            if(edit) {
                editSideDish();
            } else {
                addSideDish();
            }
        }
    }

    const addIngredient = () => {
        setIngredients(oldIngredients => [...oldIngredients, 5] );
    }

    const addSideDish = () => {
        /*const selectedAllergens = allergens.filter((allergen) => selectedAllergensName.includes(allergen.name));
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
        });*/
    }

    const editSideDish = () => {
        /*const selectedAllergens = allergens.filter((allergen) => selectedAllergensName.includes(allergen.name));
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
        });*/
    }


    return (
        <DialogContent color="secondary">
            <Form>
                <TextField onChange={e => setSideDishName(e.target.value)} error={nameError} value={sideDishName} required label="Název přílohy" />
                <div onClick={addIngredient}>Přidat surovinu</div>
                {
                    ingredients.map((ingredient) => {
                        return (
                            <div>{ingredient}</div>
                        )
                    })
                }
                <IngredientForm>
                    <TextField onChange={e => setSideDishName(e.target.value)} error={nameError} value={sideDishName} required label="Název suroviny" />
                    <FormControl >
                        <InputLabel>Množství</InputLabel>
                        <OutlinedInput
                            sx={{width: 100}}
                            label="Množství"
                            value={5}
                            endAdornment={<InputAdornment position="end">kg</InputAdornment>}
                        />
                    </FormControl>
                </IngredientForm>
                <TextField
                    label="Postup receptu"
                    rows={10}
                    multiline
                />
                <ErrorForm errors={errors} />
                <Button variant="contained" loading={loading} startIcon={edit ? <EditIcon /> : <AddIcon />} loadingPosition="start" onClick={validateIngredient}>{edit ? "Upravit" : "Přidat"}</Button>
            </Form>
        </DialogContent>
    );
};

export default SideDishTemplate;

const IngredientForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`
