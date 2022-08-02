import React, {useState} from 'react';
import styled from "styled-components";
import Button from "../material-ui/Button";
import TextField from "../material-ui/TextField";
import LoginIcon from '@mui/icons-material/Login';

const Login: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState<string>("");
    const [usernameError, setUsernameError] = useState<boolean>(false);
    const [password, setPassword] = useState<string>("");
    const [passwordError, setPasswordError] = useState<boolean>(false);
    const [errors, setErrors] = useState<string[]>([]);

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
        }
    }

    const handleLogin = () => {

    }

    function isValidEmail() {
        return /\S+@\S+\.\S+/.test(username);
    }

    return (
        <Wrap>
            <LoginForm>
                <TextField onChange={e => setUsername(e.target.value)} error={usernameError} required label="Email" />
                <TextField onChange={e => setPassword(e.target.value)} error={passwordError} required label="Heslo"  type="password" />
                {errors.length > 0 &&
                    <ErrorList>
                        {errors.map((error, index) => {
                            return (
                                <ErrorItem key={index}>{error}</ErrorItem>
                            )
                        })}
                    </ErrorList>
                }
                <Button variant="contained" loading={loading} startIcon={<LoginIcon />} loadingPosition="start" onClick={validateLogin}>Přihlásit se</Button>
            </LoginForm>
        </Wrap>

    );
};

export default Login;

const Wrap = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
  }
`

const LoginForm = styled.div`
  background-color: ${p => p.theme.secondary};
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  border-radius: 10px;
  flex: 1;
  font-size: 20px;
  
  @media (min-width: 768px) {
    flex: none;
    gap: 20px;
    padding: 35px;
  }
`

const ErrorList = styled.ul`
  list-style-position: inside;
  color: red;
`

const ErrorItem = styled.li`
  font-size: 16px;
  text-indent: -22px;
  margin-left: 22px;
  
  @media (min-width: 768px) {
    font-size: 14px;
  }
`
