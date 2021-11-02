import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import Login from './Pages/Login';
import Map from './Pages/Map';
import ProtectedRoute from './Api/ProtectedRoute';
import { esES as coreEsES } from '@mui/material/locale';
import { esES } from '@mui/x-data-grid';
import { Provider } from 'react-redux';
import { store } from './Redux';
import Alert from './Components/Alert';
import { DEFAULT_CLOUD_PROVIDER, getCloudProvider } from './cloud-providers';

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
                        <Route exact path='/auth' component={ProvidersAuth} />
                        <ProtectedRoute exact path='/map' component={Map} />
                        <Route exact path='/map/guest' component={Map} />
                    </Switch>
                </Router>
                <Alert />
            </Provider>
        </ThemeProvider>
    );
}

function ProvidersAuth(){
    const history = useHistory();
    useEffect(()=>{
        const authProvider = getCloudProvider(DEFAULT_CLOUD_PROVIDER);
        if (window.opener) {
            const {location} = history;
            const token = authProvider.getAccessTokenFromLocation(location);
            //@ts-ignore
            window.opener.postMessage({token}, location.origin);
        }
        // eslint-disable-next-line
    },[])

    return(<></>);
}

export default App;
