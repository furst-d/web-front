import React, {useState} from 'react';
import Button from "../styles/material-ui/components/Button";
import UploadIcon from '@mui/icons-material/Upload';
import {LeftForm, StartFormWrap} from "../styles/form/Form";
import {Button as UploadButton} from "@mui/material";
import ErrorForm, {ErrorItem, ErrorList} from "../form/ErrorForm";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const AvatarUploadForm = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [file, setFile] = useState<string>("");
    const [fileName, setFileName] = useState("");
    const [errors, setErrors] = useState<string[]>([]);
    const axiosPrivate = useAxiosPrivate();
    const [status, setStatus] = useState(200);

    const handleError = () => {
        if(status === 400) {
            return (<ErrorItem>Obrázek nebyl nalezen.</ErrorItem>)
        } else {
            return (<ErrorItem>Při zpracování požadavku došlo k chybě.</ErrorItem>)
        }
    }

    const validateImage = () => {
        let error: boolean = false;
        setErrors([]);

        if(!file) {
            error = true;
            setErrors(old => [...old, "Obrázek nebyl vybrán."]);
        }

        if(!error) {
            setLoading(true);
            uploadImage();
        }
    }

    const saveImage = (event: any) => {
        setFile(event.target.files[0]);
        setFileName(event.target.files[0].name);
    }

    const uploadImage = () => {
        const formData = new FormData();
        formData.append("image", file);
        formData.append("fileName", fileName);
        console.log(file);
        console.log(fileName);
        axiosPrivate.post(`/api/users/avatar`, formData, {})
            .then(() => {
                localStorage.setItem("toast", "Profilový obrázek byl úspěšně nahrán");
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
                <h4>Změna profilového obrázku</h4>
                <UploadButton variant="outlined" component="label" onChange={saveImage}>
                    Vybrat obrázek
                    <input hidden accept="image/*" multiple type="file" />
                </UploadButton>
                {fileName}
                <ErrorForm errors={errors} />
                {status !== 200 && (
                    <ErrorList>
                        {handleError()}
                    </ErrorList>
                )}
                <Button variant="contained" loading={loading} startIcon={<UploadIcon />} loadingPosition="start" onClick={validateImage}>Nahrát obrázek</Button>
            </LeftForm>
        </StartFormWrap>
    );
};

export default AvatarUploadForm;
