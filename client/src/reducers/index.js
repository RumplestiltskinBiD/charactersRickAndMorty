import {applyMiddleware, combineReducers, createStore} from 'redux'
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import userReducer from "./userReducer";
import userBioReducer from "./userBioReducer";

const rootReducer = combineReducers({
    user: userReducer,
    bio: userBioReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))