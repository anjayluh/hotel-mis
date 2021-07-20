import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import ContentSwitch from "./modules/ContentSwitch";
import Login from "./modules/login/LoginSimple";
import Splash from "./modules/login/Splash";
import { useSelector } from 'react-redux'
import { ICoreState } from "./data/redux/coreReducer";
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';


const App: React.FC = () => {
    console.log("Starting App")
    const authState: ICoreState = useSelector((state: any) => state.core)
    const { isLoading } = authState
    const user = {
        username: "admin", role: "admin"
    }
    if (isLoading) {
        return <Router><Splash /></Router>
    } else {
        return <Router>
            <ToastContainer />
            <>
                {user ?
                    <React.Fragment>
                        <ErrorBoundary><ContentSwitch /></ErrorBoundary>
                    </React.Fragment>
                    :
                    <Switch>
                        <Route exact component={Login} />
                    </Switch>
                }
            </>
        </Router>;
    }
}

export default App;
