import React, {useEffect, useState} from 'react';
import {Form} from "../styles/form/Form";
import TextField from "../styles/material-ui/components/TextField";
import Button from "../styles/material-ui/components/Button";
import ErrorForm, {ErrorItem, ErrorList} from "../form/ErrorForm";
import {DialogContent, FormControlLabel, FormGroup} from "@mui/material";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {PageProp} from "../navbar/Navbar";
import CheckBox from "../styles/material-ui/components/CheckBox";
import {UserProp} from "./UserList";
import EditIcon from '@mui/icons-material/Edit';

interface EditUserProp {
    user: UserProp
}

const EditUser = ({user}: EditUserProp) => {
    const [email, setEmail] = useState<string>(user.email);
    const [emailError, setEmailError] = useState<boolean>(false);
    const [name, setName] = useState<string>(user.first_name);
    const [nameError, setNameError] = useState<boolean>(false);
    const [lastName, setLastName] = useState<string>(user.last_name);
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
                setSelectedPages();
            })
    }, [axiosPrivate])

    const setSelectedPages = () => {
        const permittedPagesId: number[] = [];
        user.permitted_pages_id.split(",").forEach((page) => {
            permittedPagesId.push(Number(page));
        });
        setSelectedPagesId(permittedPagesId);
    }

    const validateEdit = () => {
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
            handleEdit();
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

    const handleEdit = () => {
        selectedPagesId.sort((a, b) => (a - b));
        axiosPrivate.put(`/api/users/${user.user_id}`, {
            email: email,
            name: name,
            lastname: lastName,
            permitted_pages: selectedPagesId.join(",")
        }).then(() => {
            localStorage.setItem("toast", "Uživatel byl úspěšně upraven");
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
                    <TextField onChange={e => setEmail(e.target.value)} error={emailError} required label="Email" value={email} />
                    <TextField onChange={e => setName(e.target.value)} error={nameError} required label="Jméno" value={name} />
                    <TextField onChange={e => setLastName(e.target.value)} error={lastNameError} required label="Příjmení" value={lastName} />
                    {isPendingPages
                        ?
                        <div>Načítám...</div>
                        :
                        <FormGroup>
                            <h5>Nastavení práv:</h5>
                            {pages.map((page, index) => {
                            return (
                                <FormControlLabel key={index} control={<CheckBox checked={selectedPagesId.includes(page.page_id)} onChange={(e) => handleCheckboxChange(e, page.page_id)} />} label={page.description} />
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
                    <Button variant="contained" loading={loading} startIcon={<EditIcon />} loadingPosition="start" onClick={validateEdit}>Uložit</Button>
                </Form>
            </DialogContent>
        </>
    );
};

export default EditUser;
