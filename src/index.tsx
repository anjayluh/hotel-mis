import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import { SnackbarProvider} from 'notistack';
import {ThemeProvider,} from '@material-ui/styles';
import 'react-toastify/dist/ReactToastify.css';
import store from "./data/redux/store";
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import theme from "./theme";

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
          <SnackbarProvider maxSnack={3}>
            <App/>
          </SnackbarProvider>
        </ThemeProvider>
    </Provider>, document.getElementById('root'));

serviceWorker.register();
