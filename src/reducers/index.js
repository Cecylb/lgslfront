import isDarkTheme from "./isDarkTheme";
import {combineReducers} from 'redux';

//To add more reducers in the future
const reducers = combineReducers({
    themeDark: isDarkTheme
})

export default reducers;