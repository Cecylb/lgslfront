import {FETCH_ELEMENTS, FETCH_PDF, FETCH_TEMPLATE, FETCH_USER} from "../actions";

const initialState = {
    elements: [],
    template: '',
    pdf: [],
    user: {
        username: 'guest',
        loggedIn: false
    }
}


export const fetchReducer = (state= initialState, action) => {
    switch (action.type) {
        case FETCH_ELEMENTS :
            return {...state, elements: action.payload}
        case FETCH_TEMPLATE :
            return {...state, template: action.payload}
        case FETCH_PDF :
            return {...state, pdf: action.payload}
        case FETCH_USER :
            return {...state, user: action.payload}
        default : return state;
    }
}