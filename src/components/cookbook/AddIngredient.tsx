import React, {useEffect, useState} from 'react';
import {Form} from "../styles/form/Form";
import TextField from "../styles/material-ui/components/input/TextField";
import {
    DialogContent,
    FormControl, SelectChangeEvent,
} from "@mui/material";
import ErrorForm, {ErrorItem, ErrorList} from "../form/ErrorForm";
import Button from "../styles/material-ui/components/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import MenuItem from "../styles/material-ui/components/menu/MenuItem";
import MultiSelect from "../styles/material-ui/components/input/MultiSelect";
import InputLabel from "../styles/material-ui/components/input/InputLabel";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

export interface AllergenProps {
    allergen_id: number,
    name: string,
}

const AddIngredient = () => {
    const [ingredientName, setIngredientName] = useState<string>("");
    const [nameError, setNameError] = useState<boolean>(false);
    const [status, setStatus] = useState<number>(200);
    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<string[]>([]);

    const [selectedAllergensName, setSelectedAllergensName] = useState<string[]>([]);
    const [allergens, setAllergens] = useState<AllergenProps[]>([]);
    const [isPendingAllergens, setIsPendingAllergens] = useState<boolean>(true);
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        axiosPrivate.get(`/api/cookbook/allergens`)
            .then(res => {
                setAllergens(res.data.data);
                setIsPendingAllergens(false);
            })
    }, [axiosPrivate])

    const handleAllergenChange = (event: SelectChangeEvent<unknown>) => {
        const values = event.target.value as string[];
        setSelectedAllergensName(values);
    };

    const validateIngredient = () => {
        console.log(selectedAllergensName);
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
            addIngredient();
        }
    }

    const addIngredient = () => {
        const selectedIds = allergens.filter((allergen) => selectedAllergensName.includes(allergen.name)).map((allergen) => allergen.allergen_id);
        selectedIds.sort((a, b) => (a - b));
        console.log(selectedIds);
        axiosPrivate.post(`/api/cookbook/ingredients`, {
            name: ingredientName,
            allergenIds: selectedIds.length > 0 ? selectedIds.join(",") : null,
        }).then(() => {
            localStorage.setItem("toast", "Surovina byla přidána");
            window.location.reload();
        }).catch((error) => {
            if(error.response) {
                setStatus(error.response.status);
                setLoading(false);
            }
        });
    }


    return (
        <DialogContent color="secondary">
            <Form>
                <TextField onChange={e => setIngredientName(e.target.value)} error={nameError} value={ingredientName} required label="Surovina" />
                {isPendingAllergens
                    ?
                    <div>Načítám...</div>
                    :
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
                }
                <ErrorForm errors={errors} />
                {status !== 200 && (
                    <ErrorList>
                        <ErrorItem>Při zpracování požadavku došlo k chybě.</ErrorItem>
                    </ErrorList>
                )}
                <Button variant="contained" loading={loading} startIcon={<PersonAddIcon />} loadingPosition="start" onClick={validateIngredient}>Přidat</Button>
            </Form>
        </DialogContent>
    );
};

export default AddIngredient;
