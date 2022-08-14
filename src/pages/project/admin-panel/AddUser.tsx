import React, {useEffect, useState} from 'react';
import {Form} from "../../../components/form/Form";
import TextField from "../../../components/material-ui/components/TextField";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Button from "../../../components/material-ui/components/Button";
import ErrorForm, {ErrorItem, ErrorList} from "../../../components/form/ErrorForm";
import {DialogContent, FormControlLabel, FormGroup} from "@mui/material";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import {PageProp} from "../../../components/navbar/Navbar";
import CheckBox from "../../../components/material-ui/components/CheckBox";

const AddUser = () => {
    const [email, setEmail] = useState<string>("");
    const [emailError, setEmailError] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const [nameError, setNameError] = useState<boolean>(false);
    const [lastName, setLastName] = useState<string>("");
    const [lastNameError, setLastNameError] = useState<boolean>(false);
    const [errors, setErrors] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [isPendingPages, setIsPendingPages] = useState<boolean>(true);
    const [pages, setPages] = useState<PageProp[]>([]);
    const [selectedPagesId, setSelectedPagesId] = useState<number[]>([]);
    const [status, setStatus] = useState<number>(200);
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        axiosPrivate.get(`/api/users/pages`)
            .then(res => {
                setPages(res.data.data);
                setIsPendingPages(false);
            })
    }, [axiosPrivate])

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
        if(!isValidEmail()) {
            error = true;
            setErrors(old => [...old, "Email musí mít správný formát"]);
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
        if(selectedPagesId.length === 0) {
            error = true;
            setErrors(old => [...old, "Uživatel musí mít nastavené alespoň jedno oprávnění."]);
        }

        if(!error) {
            setLoading(true);
            handleRegister();
        }
    }

    const handleError = () => {
        if(status === 400) {
            return (<ErrorItem>Uživatel s tímto jménem již existuje</ErrorItem>)
        } else {
            return (<ErrorItem>Při zpracování požadavku došlo k chybě.</ErrorItem>)
        }
    }

    function isValidEmail() {
        return /\S+@\S+\.\S+/.test(email);
    }

    const handleRegister = () => {
        selectedPagesId.sort((a, b) => (a - b));
        axiosPrivate.post(`/api/users/register`, {
            email: email,
            name: name,
            lastname: lastName,
            permitted_pages: selectedPagesId.join(",")
        }).then(() => {
            localStorage.setItem("toast", "Uživatel byl úspěšně přidán");
            window.location.reload();
        }).catch((error) => {
            if(error.response) {
                setStatus(error.response.status);
                setLoading(false);
            }
        });
    }

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, id: number) =>{
        if(event.target.checked) {
            setSelectedPagesId(oldPagesId => [...oldPagesId, id]);
        } else {
            setSelectedPagesId(selectedPagesId.filter((pageId) => pageId !== id));
        }
    }

    return (
        <>
            <DialogContent color="secondary">
                <Form>
                    <TextField onChange={e => setEmail(e.target.value)} error={emailError} required label="Email" />
                    <TextField onChange={e => setName(e.target.value)} error={nameError} required label="Jméno" />
                    <TextField onChange={e => setLastName(e.target.value)} error={lastNameError} required label="Příjmení" />
                    {isPendingPages
                        ?
                        <div>Načítám...</div>
                        :
                        <FormGroup>
                            <h5>Nastavení práv:</h5>
                            {pages.map((page, index) => {
                            return (
                                <FormControlLabel key={index} control={<CheckBox onChange={(e) => handleCheckboxChange(e, page.page_id)} />} label={page.description} />
                            )
                        })}
                        </FormGroup>
                    }
                    <ErrorForm errors={errors} />
                    {status !== 200 && (
                        <ErrorList>
                            {handleError()}
                        </ErrorList>
                    )}
                    <Button variant="contained" loading={loading} startIcon={<PersonAddIcon />} loadingPosition="start" onClick={validateRegister}>Zaregistrovat</Button>
                </Form>
            </DialogContent>
        </>
    );
};

export default AddUser;
