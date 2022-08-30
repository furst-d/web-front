import {styled, Chip as ChipOrig, ChipProps} from "@mui/material"

const Chip = styled(ChipOrig)<ChipProps>(({theme}) => ({
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.bg.main,
}));

export default Chip;




