import {styled, InputLabel as InputLabelOrig, InputLabelProps} from "@mui/material"

const InputLabel = styled(InputLabelOrig)<InputLabelProps>(({theme}) => ({
    color: theme.palette.primary.contrastText,
}));

export default InputLabel;




