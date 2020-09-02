import {combineReducers} from "redux";
import {fetchReducer} from "./fetchReducer";
import {appReducer} from "./appReducer";

const reducers = combineReducers({
    app: appReducer,
    fetchReducer: fetchReducer
})

export default reducers;