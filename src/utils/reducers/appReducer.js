import {HIDE_LOADER, PREVIEW_MANAGED, SHOW_LOADER, THEME_SELECTED} from "../actions";

const initialState = {
    loading: false,
    preview: true
}

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_LOADER:
            return {...state, loading: true}
        case HIDE_LOADER:
            return {...state, loading: false}
        case PREVIEW_MANAGED:
            return {...state, preview: action.payload}
        default: return state
    }
}