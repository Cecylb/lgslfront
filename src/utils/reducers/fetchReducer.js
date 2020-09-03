import {FETCH_ELEMENTS, FETCH_PDF, FETCH_TEMPLATE} from "../actions";

const initialState = {
    elements: [],
    template: '',
    pdf: []
}


export const fetchReducer = (state= initialState, action) => {
    switch (action.type) {
        case FETCH_ELEMENTS :
            return {...state, elements: action.payload}
        case FETCH_TEMPLATE :
            return {...state, template: action.payload}
        case FETCH_PDF :
            return {...state, pdf: action.payload}
        default : return state;
    }
}