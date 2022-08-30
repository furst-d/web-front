import {MenuItem as MenuItemOrig, MenuItemProps, styled} from "@mui/material"

const MenuItem = styled(MenuItemOrig)<MenuItemProps>(({theme}) => ({
    '&.Mui-selected': {
        backgroundColor: theme.palette.primary.main,

        '&:hover': {
            backgroundColor: theme.palette.primary.main
        },
    }
}));

export default MenuItem;




