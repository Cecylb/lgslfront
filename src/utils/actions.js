export const THEME_SELECTED = 'THEME_SELECTED'
export const FETCH_ELEMENTS = 'FETCH_ELEMENTS'
export const REQUEST_ELEMENTS = 'REQUEST_ELEMENTS'

export function darkTheme(boolean) {
    return {
        type: THEME_SELECTED,
        payload: boolean
    }
}

export function fetchElements() {
    return {
        type: REQUEST_ELEMENTS
    }
}