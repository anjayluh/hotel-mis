import { applyMiddleware, combineReducers, createStore } from "redux";
import { createLogger } from "redux-logger";
import ReduxThunk from "redux-thunk";
import core from "./coreReducer";
import users from "./users/reducer";
import settings from "./settings/reducer";

const myWindow = window as any;
const toolsName = "__REDUX_DEVTOOLS_EXTENSION__";
const devTools: any = myWindow[toolsName]
  ? myWindow[toolsName]()
  : (f: any) => f;
const reducers = combineReducers({
  core,
  users,
  settings,
});
const middleware = applyMiddleware(createLogger(), ReduxThunk);
const store: any = middleware(devTools(createStore))(reducers);
export default store;
