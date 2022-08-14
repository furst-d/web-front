import {Checkbox, CheckboxProps, styled} from "@mui/material";

const CheckBox = styled(Checkbox)<CheckboxProps>(({theme}) => ({
    color: theme.palette.primary.contrastText,
}));

export default CheckBox;