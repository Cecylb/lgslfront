import {HIDE_ALERT, HIDE_LOADER, PREVIEW_MANAGED, SHOW_ALERT, SHOW_LOADER} from "../actions";

const initialState = {
    loading: true,
    alert: false,
    preview: true
}

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_LOADER:
            return {...state, loading: true}
        case HIDE_LOADER:
            return {...state, loading: false}
        case SHOW_ALERT:
            return {...state, alert: true}
        case HIDE_ALERT:
            return {...state, alert: false}
        case PREVIEW_MANAGED:
            return {...state, preview: action.payload}
        default: return state
    }
}