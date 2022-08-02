import {styled} from "@mui/material"
import {LoadingButton, LoadingButtonProps} from "@mui/lab";

const Button = styled(LoadingButton)<LoadingButtonProps>(({theme}) => ({
    textTransform: "none",
    fontSize: 20,

    '&.Mui-disabled': {
        color: theme.palette.primary.contrastText
    },

    [theme.breakpoints.up('sm')]: {
        fontSize: 16
    },

}));

export default Button;




