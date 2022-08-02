import React from 'react';
import Navbar from "./navbar/Navbar";
import styled from "styled-components";
import AuthProvider from "./auth/AuthProvider";
import StyleProvider from "./styles/StyleProvider";

function App() {
  return (
      <StyleProvider>
          <Application>
              <AuthProvider>
                  <Navbar />
              </AuthProvider>
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

