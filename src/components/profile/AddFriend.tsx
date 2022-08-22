import React, {useState} from 'react';
import {Form} from "../styles/form/Form";
import TextField from "../styles/material-ui/components/TextField";
import {DialogContent} from "@mui/material";
import ErrorForm, {ErrorItem, ErrorList} from "../form/ErrorForm";
import Button from "../styles/material-ui/components/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const AddFriend = () => {
    const [email, setEmail] = useState<string>("");
    const [emailError, setEmailError] = useState<boolean>(false);
    const [errors, setErrors] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [status, setStatus] = useState<number>(200);

    const handleError = () => {
        if(status === 400) {
            return (<ErrorItem>Uživatel s tímto jménem již existuje</ErrorItem>)
        } else {
            return (<ErrorItem>Při zpracování požadavku došlo k chybě.</ErrorItem>)
        }
    }

    const validateAddFriend = () => {
        console.log("Validuji");
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
