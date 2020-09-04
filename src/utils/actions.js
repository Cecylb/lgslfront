export const THEME_SELECTED = 'THEME_SELECTED'
export const PREVIEW_MANAGED = 'PREVIEW_MANAGED'
export const SHOW_LOADER = 'SHOW_LOADER'
export const HIDE_LOADER = 'HIDE_LOADER'
export const FETCH_ELEMENTS = 'FETCH_ELEMENTS'
export const REQUEST_ELEMENTS = 'REQUEST_ELEMENTS'
export const FETCH_TEMPLATE = 'FETCH_TEMPLATE'
export const REQUEST_TEMPLATE = 'REQUEST_TEMPLATE'
export const REQUEST_PDF = 'REQUEST_PDF'
export const FETCH_PDF = 'FETCH_PDF'

export function darkTheme(boolean) {
    return {
        type: THEME_SELECTED,
        payload: boolean
    }
}

export function managePreview(boolean) {
    return {
        type: PREVIEW_MANAGED,
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

export function  fetchPdf(input) {
    return {
        type: REQUEST_PDF,
        input: input
    }
}