import React from 'react';
import {DialogActions, DialogContent, DialogTitle} from "@mui/material";
import Button from "../styles/material-ui/components/Button";
import styled from "styled-components";
import DialogContentText from "../styles/material-ui/components/DialogContentText";

interface ConfirmationDialogProp {
    content: string,
    onAccept: () => void;
    onClose: () => void;
}

const ConfirmationDialog = ({content, onAccept, onClose}: ConfirmationDialogProp) => {
    return (
        <>
            <DialogTitleStyled>Potvrzení</DialogTitleStyled>
            <DialogContent>
                <DialogContentText>
                    {content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Ne</Button>
                <Button variant="contained" onClick={onAccept} autoFocus>Ano</Button>
            </DialogActions>
        </>
    );
};

export default ConfirmationDialog;

const DialogTitleStyled = styled(DialogTitle)`
  background-color: ${p => p.theme.secondary};
  color: ${p => p.theme.text};
`