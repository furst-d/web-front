import {styled, TextField as TextFieldOrig, TextFieldProps} from "@mui/material"

const TextField = styled(TextFieldOrig)<TextFieldProps>(({theme}) => ({
    label: {
        color: theme.palette.primary.contrastText,
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: theme.palette.primary.contrastText,
        },
        '&:hover fieldset': {
            borderColor: theme.palette.primary.main,
        },
        '&.Mui-focused fieldset': {
            borderColor: theme.palette.primary.main,
        },
    },

    '& .MuiOutlinedInput-input': {
        color: theme.palette.primary.contrastText,
    },
}));

export default TextField;




