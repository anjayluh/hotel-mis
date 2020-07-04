import {applyMiddleware, combineReducers, createStore} from "redux";
import {createLogger} from 'redux-logger'
import ReduxThunk from 'redux-thunk'
import core from "./coreReducer";
import participants from "./participants/reducer";
import workflows from "./workflows/reducer";
import crm from './contacts/reducer';
import users from './users/reducer';
import billing from './billing/reducer'
import settings from './settings/reducer'
import verificationRequests from './ninVerification/reducer'
import subscriptions from './subscription/redux'

const myWindow = window as any;
const toolsName = '__REDUX_DEVTOOLS_EXTENSION__';
const devTools: any = myWindow[toolsName] ? myWindow[toolsName]() : (f: any) => f;
const reducers = combineReducers(
    {core, participants, workflows, crm, users, billing, settings, verificationRequests, subscriptions});
const middleware = applyMiddleware(createLogger(), ReduxThunk);
const store: any = middleware(devTools(createStore))(reducers);
export default store
