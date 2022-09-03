import {TextFieldProps, styled} from "@mui/material";
import React from "react";
import TextField from "./TextField";

const MultiTextField = styled((props: TextFieldProps) => (
    <TextField
        rows={10}
        multiline
        {...props}
    />
))(({ theme }) => ({
    width: "unset",
    [`${theme.breakpoints.up('sm')} or (orientation: landscape)`]: {
        width: 500,
    },
    [`${theme.breakpoints.up('sm')} and (orientation: landscape)`]: {
        width: 600,
    },
}));

export default MultiTextField;