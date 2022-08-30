import React, {useState} from 'react';
import {Form} from "../styles/form/Form";
import TextField from "../styles/material-ui/components/input/TextField";
import {
    DialogContent,
    FormControl,
} from "@mui/material";
import ErrorForm, {ErrorItem, ErrorList} from "../form/ErrorForm";
import Button from "../styles/material-ui/components/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import MenuItem from "../styles/material-ui/components/menu/MenuItem";
import MultiSelect from "../styles/material-ui/components/input/MultiSelect";
import InputLabel from "../styles/material-ui/components/input/InputLabel";

const validateIngredient = () => {
    console.log("Validuji");
}

const AddIngredient = () => {
    const [ingredientName, setIngredientName] = useState<string>("");
    const [nameError, setNameError] = useState<boolean>(false);
    const [status, setStatus] = useState<number>(200);
    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<string[]>([]);

    const [personName, setPersonName] = React.useState<string[]>([]);

    const names = [
        'Oliver Hansen',
        'Van Henry',
        'April Tucker',
        'Ralph Hubbard',
        'Omar Alexander',
        'Carlos Abbott',
        'Miriam Wagner',
        'Bradley Wilkerson',
        'Virginia Andrews',
        'Kelly Snyder',
    ];

    const handleChange = (event: any) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <DialogContent color="secondary">
            <Form>
                <TextField onChange={e => setIngredientName(e.target.value)} error={nameError} value={ingredientName} required label="Surovina" />
                <FormControl >
                    <InputLabel>Alergeny</InputLabel>
                    <MultiSelect
                        label="Alergeny"
                        value={personName}
                        onChange={handleChange}
                    >
                        {names.map((name) => (
                            <MenuItem
                                key={name}
                                value={name}
                            >
                                {name}
                            </MenuItem>
                        ))}
                    </MultiSelect>
                </FormControl>
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
