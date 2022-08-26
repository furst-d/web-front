import React, {useState} from 'react';
import {Form} from "../styles/form/Form";
import TextField from "../styles/material-ui/components/TextField";
import {DialogContent} from "@mui/material";
import ErrorForm, {ErrorItem, ErrorList} from "../form/ErrorForm";
import Button from "../styles/material-ui/components/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {getUserData} from "../../utils/auth/AuthManager";

const AddFriend = () => {
    const [email, setEmail] = useState<string>("");
    const [emailError, setEmailError] = useState<boolean>(false);
    const [errors, setErrors] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [status, setStatus] = useState<number>(200);
    const axiosPrivate = useAxiosPrivate();

    const handleError = () => {
        switch (status) {
            case 400:
                return (<ErrorItem>Žádost již byla odeslána</ErrorItem>);
            case 404:
                return (<ErrorItem>Uživatel s tímto emailem nebyl nalezen</ErrorItem>);
            default:
                return (<ErrorItem>Při zpracování požadavku došlo k chybě.</ErrorItem>)
        }
    }

    const validateAddFriend = () => {
        let error: boolean = false;
        setErrors([]);
        setEmailError(false);
        setStatus(200);

        if(!email) {
            error = true;
            setEmailError(true);
            setErrors(old => [...old, "Email musí být vyplněn."]);
        }

        if(email === getUserData().email) {
            error = true;
            setEmailError(true);
            setErrors(old => [...old, "Nelze poslat žádost o přátelství sobě"]);
        }

        if(!isValidEmail()) {
            error = true;
            setErrors(old => [...old, "Email musí mít správný formát"]);
            setEmailError(true);
        }

        if(!error) {
            setLoading(true);
            handleAddFriend();
        }
    }


const handleAddFriend = () => {
    axiosPrivate.post(`/api/users/friend-requests`, {
        email: email
    }).then(() => {
        localStorage.setItem("toast", "Žádost o přátelství byla odeslána");
        window.location.reload();
    }).catch((error) => {
        if(error.response) {
            setStatus(error.response.status);
            setLoading(false);
        }
    });
}

function isValidEmail() {
    return /\S+@\S+\.\S+/.test(email);
}

return (
    <DialogContent color="secondary">
        <Form>
            <TextField onChange={e => setEmail(e.target.value)} error={emailError} required label="Zadejte email uživatele" />
            <ErrorForm errors={errors} />
            {status !== 200 && (
                <ErrorList>
                    {handleError()}
                </ErrorList>
            )}
            <Button variant="contained" loading={loading} startIcon={<PersonAddIcon />} loadingPosition="start" onClick={validateAddFriend}>Odeslat žádost o přátelství</Button>
        </Form>
    </DialogContent>
);
};

export default AddFriend;
