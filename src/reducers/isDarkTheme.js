
const isDarkTheme = (boolean=false, action) => {
    switch (action.type) {
        case "THEME_SELECTED" : return action.payload;
        default : return boolean;
    }
};

export default isDarkTheme;