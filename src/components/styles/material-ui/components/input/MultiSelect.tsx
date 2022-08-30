import {Box, SelectProps, styled} from "@mui/material";
import Select from "./Select";
import React from "react";
import Chip from "./Chip";

const MultiSelect = styled((props: SelectProps) => (
    <Select
        multiple
        renderValue={(selected: any) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value: any) => (
                    <Chip key={value} label={value} />
                ))}
            </Box>
        )}
        {...props}
    />
))(() => ({}));

export default MultiSelect;