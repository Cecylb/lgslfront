import {combineReducers} from 'redux';
import {FETCH_ELEMENTS, THEME_SELECTED} from "./actions";

export const fetchElements = (state=[], action) => {
    switch (action.type) {
        case FETCH_ELEMENTS : return action.payload
        default : return state;
    }
}

export const isDarkTheme = (boolean=false, action) => {
    switch (action.type) {
        case THEME_SELECTED : return action.payload;
        default : return boolean;
    }
}

const reducers = combineReducers({
    themeDark: isDarkTheme,
    fetchElements: fetchElements
})

export default reducers;