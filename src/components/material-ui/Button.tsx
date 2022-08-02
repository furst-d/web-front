import {styled} from "@mui/material"
import {LoadingButton, LoadingButtonProps} from "@mui/lab";

const Button = styled(LoadingButton)<LoadingButtonProps>(({theme}) => ({
    textTransform: "none",

    '&.Mui-disabled': {
        color: theme.palette.primary.contrastText
    }
}));

export default Button;




