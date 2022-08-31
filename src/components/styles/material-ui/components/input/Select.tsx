import {styled, Select as SelectOrig, SelectProps} from "@mui/material"

const Select = styled(SelectOrig)<SelectProps>(({theme}) => ({
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.contrastText,
    },

    '& .MuiSelect-icon': {
        color: theme.palette.primary.contrastText,
    },
}));

export default Select;




