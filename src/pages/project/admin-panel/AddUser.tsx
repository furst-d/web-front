import React, {useState} from 'react';
import {Form} from "../../../components/form/Form";
import TextField from "../../../components/material-ui/components/TextField";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Button from "../../../components/material-ui/components/Button";
import ErrorForm from "../../../components/form/ErrorForm";
import {DialogContent} from "@mui/material";

const AddUser = () => {
    const [email, setEmail] = useState<string>("");
    const [emailError, setEmailError] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const [nameError, setNameError] = useState<boolean>(false);
    const [lastName, setLastName] = useState<string>("");
    const [lastNameError, setLastNameError] = useState<boolean>(false);
    const [errors, setErrors] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const validateRegister = () => {
        let error: boolean = false;
        setEmailError(false);
        setNameError(false);
        setLastNameError(false);
        setErrors([]);

        if(!email) {
            error = true;
            setErrors(old => [...old, "Email musí být vyplněn."]);
            setEmailError(true);
        }
        if(!name) {
            error = true;
            setErrors(old => [...old, "Křestní jméno musí být vyplněno."]);
            setNameError(true);
        }
        if(!lastName) {
            error = true;
            setErrors(old => [...old, "Příjmení musí být vyplněno."]);
            setLastNameError(true);
        }

        if(!error) {
            setLoading(true);
            handleRegister();
        }
    }

    const handleRegister = () => {
        console.log("Registruji...");
    }

    return (
        <>
            <DialogContent color="secondary">
                <Form>
                    <TextField onChange={e => setEmail(e.target.value)} error={emailError} required label="Email" />
                    <TextField onChange={e => setName(e.target.value)} error={nameError} required label="Jméno" />
                    <TextField onChange={e => setLastName(e.target.value)} error={lastNameError} required label="Příjmení" />
                    <ErrorForm errors={errors} />
                    Práva na stránky: TODO
                    <Button variant="contained" loading={loading} startIcon={<PersonAddIcon />} loadingPosition="start" onClick={validateRegister}>Zaregistrovat</Button>
                </Form>
            </DialogContent>
        </>
    );
};

export default AddUser;
