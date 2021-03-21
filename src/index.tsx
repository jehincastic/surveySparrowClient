import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider, ThemeProvider } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import theme from './theme';
import UserProvider from './providers/UserProvider';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ChakraProvider>
        <ThemeProvider theme={theme}>
          <UserProvider>
            <App />
          </UserProvider>
        </ThemeProvider>
      </ChakraProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
