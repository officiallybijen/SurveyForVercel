import { combineReducers, createStore } from "redux";
import formElementReducer from "./reducers/formElementReducer";
import resultReducer from "./reducers/resultReducer";

const rootReducer = combineReducers({
    formElements: formElementReducer,
    result: resultReducer
})

const store = createStore(rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store