import {IconButton as IconButtonOrig, IconButtonProps, styled} from "@mui/material"

const IconButton = styled(IconButtonOrig)<IconButtonProps>(({theme}) => ({
    color: theme.palette.primary.contrastText,

    '&:hover': {
        backgroundColor: theme.palette.primary.main,
    }
}));

export default IconButton;




