import styled from "styled-components";
import {Dialog as DialogOrig, DialogProps} from "@mui/material";

const Dialog = styled(DialogOrig)<DialogProps>(({theme}) => ({
    '& .MuiDialogContent-root': {
        backgroundColor: theme.secondary,
    },
    '& .MuiDialogActions-root': {
        backgroundColor: theme.secondary,
    },
}));

export default Dialog;