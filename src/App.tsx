import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import Login from './Pages/Login';
import Map from './Pages/Map';
import ProtectedRoute from './Api/ProtectedRoute';
import { esES as coreEsES } from '@mui/material/locale';
import { esES } from '@mui/x-data-grid';
import { Provider } from 'react-redux';
import { store } from './Redux';
import Alert from './Components/Alert';

const darkTheme = createTheme(
    {
        palette: {
            mode: 'dark',
        },
    },
    esES,
    coreEsES,
);

function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route exact path='/' component={Login} />
                        <ProtectedRoute exact path='/map' component={Map} />
                    </Switch>
                </Router>
                <Alert />
            </Provider>
        </ThemeProvider>
    );
}

export default App;
