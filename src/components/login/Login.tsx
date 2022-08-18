import React, {useState} from 'react';
import Button from "../styles/material-ui/components/Button";
import TextField from "../styles/material-ui/components/TextField";
import LoginIcon from '@mui/icons-material/Login';
import axios from "../../api/axios";
import {setTokens} from "../../utils/auth/AuthManager";
import {Helmet} from "react-helmet";
import ErrorForm, {ErrorItem, ErrorList} from "../form/ErrorForm";
import {CenterFormWrap, Form} from "../styles/form/Form";

const Login: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState<string>("");
    const [usernameError, setUsernameError] = useState<boolean>(false);
    const [password, setPassword] = useState<string>("");
    const [passwordError, setPasswordError] = useState<boolean>(false);
    const [errors, setErrors] = useState<string[]>([]);
    const [status, setStatus] = useState(200);

    const handleError = () => {
        switch (status) {
            case 401:
            case 400:
                return (<ErrorItem>Chybné uživatelské jméno nebo email.</ErrorItem>)
            default:
                return (<ErrorItem>Při zpracování požadavku došlo k chybě.</ErrorItem>)
        }
    }

    const validateLogin = () => {
        let error: boolean = false;
        setUsernameError(false);
        setPasswordError(false);
        setErrors([]);

        if(!username) {
            error = true;
            setErrors(old => [...old, "Přihlašovací jméno musí být vyplněno."]);
            setUsernameError(true);
        }
        if(!isValidEmail()) {
            error = true;
            setErrors(old => [...old, "Přihlašovací jméno musí být email."]);
            setUsernameError(true);
        }
        if(!password) {
            error = true;
            setErrors(old => [...old, "Heslo musí být vyplněno."]);
            setPasswordError(true);
        }

        if(!error) {
            setLoading(true);
            handleLogin();
        }
    }

    const handleLogin = () => {
        axios.post(`/api/users/login`, {
            username: username,
            password: password
        })
            .then(res => {
                setTokens(res.data.access_token, res.data.refresh_token);
                localStorage.setItem("toast", "Přihlášení bylo úspěšné");
                window.location.reload();
            })

            .catch((error) => {
                if(error.response) {
                    setStatus(error.response.status);
                    setLoading(false);
                }
            });
    }

    function isValidEmail() {
        return /\S+@\S+\.\S+/.test(username);
    }

    return (
        <CenterFormWrap>
            <Helmet>
                <title>Přihlásit se</title>
            </Helmet>
            <Form>
                <TextField onChange={e => setUsername(e.target.value)} error={usernameError} required label="Email" />
                <TextField onChange={e => setPassword(e.target.value)} error={passwordError} required label="Heslo"  type="password" />
                <ErrorForm errors={errors} />
                {status !== 200 && (
                    <ErrorList>
                        {handleError()}
                    </ErrorList>
                )}
                <Button variant="contained" loading={loading} startIcon={<LoginIcon />} loadingPosition="start" onClick={validateLogin}>Přihlásit se</Button>
            </Form>
        </CenterFormWrap>

    );
};

export default Login;


