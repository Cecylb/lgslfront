export const darkTheme = (boolean) => {
    console.log("BOOLEAN", boolean)
    return {
        type: "THEME_SELECTED",
        payload: boolean
    }
}