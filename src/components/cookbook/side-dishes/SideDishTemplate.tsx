import React, {useState} from 'react';
import {Form} from "../../styles/form/Form";
import TextField from "../../styles/material-ui/components/input/TextField";
import {DialogContent, FormControl, Tooltip} from "@mui/material";
import ErrorForm from "../../form/ErrorForm";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import {toast} from "react-toastify";
import styled from "styled-components";
import InputAdornment from "../../styles/material-ui/components/input/InputAdornment";
import Select from "../../styles/material-ui/components/input/Select";
import InputLabel from "../../styles/material-ui/components/input/InputLabel";
import CloseIcon from '@mui/icons-material/Close';
import MenuItem from "../../styles/material-ui/components/menu/MenuItem";
import MultiTextField from "../../styles/material-ui/components/input/MultiTextField";
import Button from "../../styles/material-ui/components/Button";
import IconButton from "../../styles/material-ui/components/IconButton";

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
    const inputArr = [
        {
            value: ""
        }
    ];

    const [sideDishName, setSideDishName] = useState<string>(name);
    const [nameError, setNameError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<string[]>([]);
    const [ingredients, setIngredients] = useState(inputArr);
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
        // @ts-ignore
        setIngredients(ingredient => {
            return [
                ...ingredient,
                {
                    value: ""
                }
            ];
        });
    }

    // @ts-ignore
    const removeIngredient = e => {
        const index = e.target.id;
        console.log("Mazaný index: " + index);
        const newArr = [...ingredients];
        newArr.splice(index, 1);
        setIngredients(newArr);
    }

    // @ts-ignore
    const handleIngredientChange = e => {
        e.preventDefault();
        const index = e.target.id;
        console.log("Index: " + index);
        setIngredients(ingredient => {
            const newArr = ingredient.slice();
            newArr[index].value = e.target.value;
            return newArr;
        });
        console.log(ingredients);
    };

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
                <Button variant="contained" color="success" size="small" loading={loading} startIcon={<AddIcon />} loadingPosition="start" onClick={addIngredient}>Přidat surovinu</Button>
                {
                    ingredients.map((ingredient, i) => {
                        return (
                            <IngredientForm key={i}>
                                <TextField onChange={handleIngredientChange} id={i.toString()} value={ingredient.value} required label="Test" />
                                <FormControl fullWidth>
                                    <InputLabel>Název suroviny</InputLabel>
                                    <Select label="Název suroviny" fullWidth><MenuItem>s=ojhspodjhpsdoh</MenuItem></Select>
                                </FormControl>
                                <TextField
                                    sx={{maxWidth: 300}}
                                    type="number"
                                    label="Množství"
                                    InputLabelProps={{shrink: true}}
                                    InputProps={{endAdornment: <InputAdornment position="end">kg</InputAdornment>}}
                                />
                                <IconButton onClick={removeIngredient} id={i.toString()}><Tooltip title="Odstranit"><CloseIcon id={i.toString()} /></Tooltip></IconButton>
                            </IngredientForm>
                        )
                    })
                }
                <Button variant="contained" color="secondary" size="small" loading={loading} startIcon={<AddIcon />} loadingPosition="start" onClick={addIngredient}>Přidat stopky</Button>
                <MultiTextField label="Postup receptu" />
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
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`


