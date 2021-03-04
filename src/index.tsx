import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import { SnackbarProvider} from 'notistack';
import {ThemeProvider,} from '@material-ui/styles';
import 'react-toastify/dist/ReactToastify.css';
import WebSocketProvider from './modules/ninVerification/webSockets/WebSocket'
import store from "./data/redux/store";
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import theme from "./theme";
import './assets/fonts/font.css'

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
          <SnackbarProvider maxSnack={3}>
            <WebSocketProvider>
              <App/>
            </WebSocketProvider>
          </SnackbarProvider>
        </ThemeProvider>
    </Provider>, document.getElementById('root'));

serviceWorker.register();
