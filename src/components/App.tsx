import React from 'react';
import styled from "styled-components";
import AuthProvider from "./auth/AuthProvider";
import StyleProvider from "./styles/StyleProvider";
import ToastProvider from "./toast/ToastProvider";
import PagesProvider from "./pages/PagesProvider";

function App() {
  return (
      <StyleProvider>
          <Application>
              <ToastProvider>
                  <AuthProvider>
                      <PagesProvider />
                  </AuthProvider>
              </ToastProvider>
          </Application>
      </StyleProvider>
  );
}

export default App;

const Application = styled.div`
  background: ${p => p.theme.bg};
  color: ${p => p.theme.text};
  height: 100vh;
  font-family: 'Open Sans', sans-serif;
`

