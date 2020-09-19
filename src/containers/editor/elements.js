import React from "react";

export const elements = (elements) => {
    return (
        <div className="tool-group">
            <div className="button-group-vertical">
                {elements.map(element => {
                return <button className={`button-link ${theme}`}
                onClick={() => this.handleElement(element)}>{element}</button>
            })}
            </div>
        </div>
    )
}