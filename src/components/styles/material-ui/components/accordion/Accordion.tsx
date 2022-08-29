import {Accordion as AccordionOrig, AccordionProps, styled} from "@mui/material"

const Accordion = styled(AccordionOrig)<AccordionProps>(({theme}) => ({
    '&.MuiAccordion-root': {
        backgroundColor: `${theme.palette.bg.main}`,
        color: `${theme.palette.primary.contrastText}`,
        borderBottom: `1px solid ${theme.palette.primary.main}`,
    },

    '&.Mui-expanded': {
        borderBottom: `none`,
        padding: "0",
    },
}));

export default Accordion;




