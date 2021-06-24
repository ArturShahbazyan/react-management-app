import { createStore } from "redux";
import { combineReducers } from "redux";
import projectReducer from "./reducers/projectReducer";
import sidebarReducer from "./reducers/sidebarReducer";

const reducers = combineReducers({
    projectReducer,
    sidebarReducer,
});

const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;