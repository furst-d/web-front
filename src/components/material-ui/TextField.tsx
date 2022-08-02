import {styled, TextField as TextFieldOrig, TextFieldProps} from "@mui/material"

const TextField = styled(TextFieldOrig)<TextFieldProps>(({theme}) => ({
    label: {
        color: theme.palette.primary.contrastText,
        fontSize: 20,

        [theme.breakpoints.up('sm')]: {
            fontSize: 16
        },
    },

    '& .MuiOutlinedInput-root': {
        fontSize: 20,
        '& fieldset': {
            borderColor: theme.palette.primary.contrastText,
        },
        '&:hover fieldset': {
            borderColor: theme.palette.primary.main,
        },
        '&.Mui-focused fieldset': {
            borderColor: theme.palette.primary.main,
        },

        [theme.breakpoints.up('sm')]: {
            fontSize: 16
        },
    },

    '& .MuiOutlinedInput-input': {
        color: theme.palette.primary.contrastText,
    },
}));

export default TextField;




