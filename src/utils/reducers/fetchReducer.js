import {FETCH_ELEMENTS, FETCH_TEMPLATE, THEME_SELECTED} from "../actions";

const initialState = {
    elements: [],
    template: ''
}


export const fetchReducer = (state= initialState, action) => {
    switch (action.type) {
        case FETCH_ELEMENTS :
            return {...state, elements: action.payload}
        case FETCH_TEMPLATE :
            return {...state, template: action.payload}
        default : return state;
    }
}