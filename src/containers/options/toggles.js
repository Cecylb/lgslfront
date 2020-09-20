import React from "react";

export const themeToggle = (options) => {
    return (
        <div>
            <h3 className="button-group-vertical"> Theme:
                <button className="button dark" onClick={() => setTheme(options, true)}>dark</button>
                <button className="button light" onClick={() => setTheme(options, false)}>light</button>
            </h3>
        </div>
    )
}

function setTheme(options, isDark) {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    options.setState({theme: isDark ? 'dark' : 'light'});
}

export const previewToggle = (options) => {
    const {theme} = options.state;
    return (
        <div>
            <h3 className="button-group-vertical"> Preview:
                <button className={`button ${theme}`} onClick={() => controlPreview(options,true)}>ON</button>
                <button className={`button ${theme}`} onClick={() => controlPreview(options,false)}>OFF</button>
            </h3>
        </div>
    )
}

function controlPreview(options, isEnabled) {
    options.props.managePreview(isEnabled);
}