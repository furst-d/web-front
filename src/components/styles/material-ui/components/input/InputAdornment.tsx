import {styled, InputAdornment as InputAdornmentOrig, InputAdornmentProps} from "@mui/material"

const InputAdornment = styled(InputAdornmentOrig)<InputAdornmentProps>(({theme}) => ({
    '& .MuiTypography-root': {
        color: theme.palette.primary.contrastText,
    }
}));

export default InputAdornment;




