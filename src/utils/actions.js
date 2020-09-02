export const THEME_SELECTED = 'THEME_SELECTED'
export const SHOW_LOADER = 'SHOW_LOADER'
export const HIDE_LOADER = 'HIDE_LOADER'
export const FETCH_ELEMENTS = 'FETCH_ELEMENTS'
export const REQUEST_ELEMENTS = 'REQUEST_ELEMENTS'
export const FETCH_TEMPLATE = 'FETCH_TEMPLATE'
export const REQUEST_TEMPLATE = 'REQUEST_TEMPLATE'
export const SUBMIT_INPUT = 'SUBMIT_INPUT'

export function darkTheme(boolean) {
    return {
        type: THEME_SELECTED,
        payload: boolean
    }
}

export function showLoader() {
    return {
        type: SHOW_LOADER
    }
}

export function hideLoader() {
    return {
        type: HIDE_LOADER
    }
}

export function fetchElements() {
    return {
        type: REQUEST_ELEMENTS
    }
}

export function fetchTemplate(element) {
    return {
        type: REQUEST_TEMPLATE,
        element: element
    }
}