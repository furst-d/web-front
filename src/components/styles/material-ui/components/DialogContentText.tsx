import {DialogContentText as DialogContentTextOrig, DialogContentTextProps, styled} from "@mui/material"

const DialogContentText = styled(DialogContentTextOrig)<DialogContentTextProps>(({theme}) => ({
    color: theme.palette.primary.contrastText,

}));

export default DialogContentText;




