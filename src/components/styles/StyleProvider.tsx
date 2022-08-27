import React from 'react';
import {createGlobalStyle, ThemeProvider as StyledThemeProvider} from "styled-components";
import {createTheme, ThemeProvider as MaterialThemeProvider} from "@mui/material/styles";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const StyleProvider: ({children}: { children: any }) => JSX.Element = ({children}) => {
    return (
        <StyledThemeProvider theme={theme}>
            <MaterialThemeProvider theme={materialTheme}>
                <GlobalStyle />
                <ToastContainer
                    position="bottom-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss={false}
                    draggable={false}
                    pauseOnHover={false}
                    theme="dark"
                />
                {children}
            </MaterialThemeProvider>
        </StyledThemeProvider>
    );
};

export default StyleProvider;

const theme = {
    bg: "#323232",
    primary: "#3da2f3",
    secondary: "#3f3f3f",
    text: "#f3fff3"
};

const GlobalStyle = createGlobalStyle<{theme: ColorTheme}>`
  * {
    margin: 0;
    padding: 0;
  }
  html, body, #root {
    height: 100%;
  }
  
  #root {
    display: flex;
    flex-direction: column;
  }

  .Toastify__toast-theme--dark {
    background-color: ${theme.secondary};
  }
`

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
