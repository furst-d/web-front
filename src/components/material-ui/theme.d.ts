import React from "react";

declare module '@mui/material/styles' {
    interface Palette {
        bg: Palette['primary'];
    }
    interface PaletteOptions {
        bg: PaletteOptions['primary'];
    }
}

declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        bg: true;
    }
}
