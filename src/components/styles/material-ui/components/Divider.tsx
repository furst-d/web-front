import {Divider as DividerOrig, DividerProps, styled} from "@mui/material"

const Divider = styled(DividerOrig)<DividerProps>(({theme}) => ({
    borderColor: theme.palette.bg.main,
}));

export default Divider;




