import {AccordionSummary as AccordionSummaryOrig, AccordionSummaryProps, styled} from "@mui/material"

const AccordionSummary = styled(AccordionSummaryOrig)<AccordionSummaryProps>(({theme}) => ({
    '&.MuiAccordionSummary-root:hover': {
        backgroundColor: `${theme.palette.primary.main}`,
    },

    '&.Mui-expanded': {
        backgroundColor: `${theme.palette.primary.main}`,
    },

    '.MuiAccordionSummary-expandIconWrapper': {
        color: `${theme.palette.primary.contrastText}`,
    },


}));

export default AccordionSummary;




