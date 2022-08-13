import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Helmet} from "react-helmet";
import TextField from "../material-ui/components/TextField";
import LoginIcon from "@mui/icons-material/Login";
import Button from "../material-ui/components/Button";
import {CenterFormWrap, Form} from "../form/Form";
import axios from "../../api/axios";
import ErrorForm, {ErrorItem, ErrorList} from "../form/ErrorForm";

const RegistrationSettings = () => {
    const token = window.location.pathname.split("/")[2];
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState<string>("");
    const [passwordConfirm, setPasswordConfirm] = useState<string>("");
    const [passwordError, setPasswordError] = useState<boolean>(false);
    const [passwordConfirmError, setPasswordConfirmError] = useState<boolean>(false);
    const [errors, setErrors] = useState<string[]>([]);
    const [status, setStatus] = useState<number>(200);

    const handleError = () => {
        switch (status) {
            case 400:
                return (<ErrorItem>Potvrzovací token není platný.</ErrorItem>)
            case 404:
                return (<ErrorItem>Potvrzovací token je chybný nebo je již aktivován.</ErrorItem>)
            default:
                return (<ErrorItem>Při zpracování požadavku došlo k chybě.</ErrorItem>)
        }
    }

    const validatePasswords = () => {
        let error: boolean = false;
        setPasswordError(false);
        setPasswordConfirmError(false);
        setErrors([]);

        if(!password) {
            error = true;
            setErrors(old => [...old, "Nové heslo musí být vyplněno."]);
            setPasswordError(true);
        }
        if(password.length < 4) {
            error = true;
            setErrors(old => [...old, "Heslo musí obsahovat alespoň 4 znaky."]);
            setPasswordError(true);
        }
        if(!passwordConfirm) {
            error = true;
            setErrors(old => [...old, "Potvrzení hesla musí být vyplněno."]);
            setPasswordConfirmError(true);
        }
        if(password !== passwordConfirm) {
            error = true;
            setErrors(old => [...old, "Zadaná hesla se musí shodovat."]);
            setPasswordConfirmError(true);
        }

        if(!error) {
            setLoading(true);
            handleAccountActivate();
        }
    }

    const handleAccountActivate = () => {
        axios.post(`/api/users/activate`, {
            token: token,
            password: password
        }).then(res => {
            if(res.data.affected === 0) {
                setStatus(404);
                setLoading(false);
            } else {
                localStorage.setItem("toast", "Účet byl úspěšně aktivován");
                navigate("/");
                window.location.reload();
            }
        }).catch((error) => {
                if(error.response) {
                    setStatus(error.response.status);
                    setLoading(false);
                }
            });
    }

    return (
        <CenterFormWrap>
            <Helmet>
                <title>Aktivace účtu</title>
            </Helmet>
            <Form>
                <TextField type="password" onChange={e => setPassword(e.target.value)} error={passwordError} required label="Nové heslo"  />
                <TextField type="password" onChange={e => setPasswordConfirm(e.target.value)} error={passwordConfirmError} required label="Potvrzení hesla" />
                <ErrorForm errors={errors} />
                {status !== 200 && (
                    <ErrorList>
                        {handleError()}
                    </ErrorList>
                )}
                <Button variant="contained" loading={loading} startIcon={<LoginIcon />} loadingPosition="start" onClick={validatePasswords}>Aktivovat účet</Button>
            </Form>
        </CenterFormWrap>
    );
};

export default RegistrationSettings;
