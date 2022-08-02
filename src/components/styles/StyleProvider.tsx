import React from 'react';
import {createGlobalStyle, ThemeProvider as StyledThemeProvider} from "styled-components";
import {createTheme, ThemeProvider as MaterialThemeProvider} from "@mui/material/styles";

const StyleProvider: ({children}: { children: any }) => JSX.Element = ({children}) => {
    return (
        <StyledThemeProvider theme={theme}>
            <MaterialThemeProvider theme={materialTheme}>
                <GlobalStyle />
                {children}
            </MaterialThemeProvider>
        </StyledThemeProvider>
    );
};

export default StyleProvider;


const GlobalStyle = createGlobalStyle<{theme: ColorTheme}>`
  * {
    margin: 0;
    padding: 0;
    font-size: 16px;
  }
`

const theme = {
    bg: "#323232",
    primary: "#3da2f3",
    secondary: "#3f3f3f",
    text: "#f3fff3"
};

const materialTheme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 768,
            md: 900,
            lg: 1200,
            xl: 1536,
        },
    },
    palette: {
        primary: {
            main: theme.primary,
            contrastText: theme.text,
        },
        secondary: {
            main: theme.secondary,
            contrastText: theme.text,
        },
        bg: {
            main: theme.bg,
            contrastText: theme.text,
        },
    },
});

export interface ColorTheme {
    bg: string;
    primary: string;
    secondary: string;
    text: string;
}
