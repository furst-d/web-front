import React, {useState} from 'react';
import {LeftForm, StartFormWrap} from "../styles/form/Form";
import TextField from "../styles/material-ui/components/TextField";
import ErrorForm, {ErrorItem, ErrorList} from "../form/ErrorForm";
import Button from "../styles/material-ui/components/Button";
import EditIcon from "@mui/icons-material/Edit";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
const PasswordChangeForm = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [oldPassword, setOldPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [newPasswordConfirm, setNewPasswordConfirm] = useState<string>("");
    const [oldPasswordError, setOldPasswordError] = useState<boolean>(false);
    const [newPasswordError, setNewPasswordError] = useState<boolean>(false);
    const [newPasswordConfirmError, setNewPasswordConfirmError] = useState<boolean>(false);
    const [errors, setErrors] = useState<string[]>([]);
    const [status, setStatus] = useState<number>(200);
    const axiosPrivate = useAxiosPrivate();

    const handleError = () => {
        if(status === 401) {
            return (<ErrorItem>Současné heslo je chybné.</ErrorItem>)
        }
        return (<ErrorItem>Při zpracování požadavku došlo k chybě.</ErrorItem>)
    }

    const validatePasswords = () => {
        let error: boolean = false;
        setOldPasswordError(false);
        setNewPasswordError(false);
        setNewPasswordConfirmError(false);
        setErrors([]);

        if(!oldPassword) {
            error = true;
            setErrors(old => [...old, "Současné heslo musí být vyplněno."]);
            setOldPasswordError(true);
        }

        if(!newPassword) {
            error = true;
            setErrors(old => [...old, "Nové heslo musí být vyplněno."]);
            setOldPasswordError(true);
        }
        if(newPassword.length < 4) {
            error = true;
            setErrors(old => [...old, "Nové heslo musí obsahovat alespoň 4 znaky."]);
            setNewPasswordError(true);
        }
        if(!newPasswordConfirm) {
            error = true;
            setErrors(old => [...old, "Potvrzení nového hesla musí být vyplněno."]);
            setNewPasswordConfirmError(true);
        }
        if(newPassword !== newPasswordConfirm) {
            error = true;
            setErrors(old => [...old, "Zadaná nová hesla se musí shodovat."]);
            setNewPasswordConfirmError(true);
        }

        if(!error) {
            setLoading(true);
            handlePasswordChange();
        }
    }

    const handlePasswordChange = () => {
        axiosPrivate.post(`/api/users/change-password`, {
            old_password: oldPassword,
            new_password: newPassword
        }).then(() => {
            localStorage.setItem("toast", "Heslo bylo úspěšně změněno");
            window.location.reload();
        }).catch((error) => {
            if(error.response) {
                setStatus(error.response.status);
                setLoading(false);
            }
        });
    }

    return (
        <StartFormWrap>
            <LeftForm>
                <h4>Změna hesla</h4>
                <TextField type="password" onChange={e => setOldPassword(e.target.value)} error={oldPasswordError} required label="Současné heslo"  />
                <TextField type="password" onChange={e => setNewPassword(e.target.value)} error={newPasswordError} required label="Nové heslo"  />
                <TextField type="password" onChange={e => setNewPasswordConfirm(e.target.value)} error={newPasswordConfirmError} required label="Potvrzení nového hesla" />
                <ErrorForm errors={errors} />
                {status !== 200 && (
                    <ErrorList>
                        {handleError()}
                    </ErrorList>
                )}
                <Button variant="contained" loading={loading} startIcon={<EditIcon />} loadingPosition="start" onClick={validatePasswords}>Změnit heslo</Button>
            </LeftForm>
        </StartFormWrap>

    );
};

export default PasswordChangeForm;
