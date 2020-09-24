import React from "react";

export const elements = (event) => {
    const {theme} =  event.state;
    return (
        <div className="tool-group">
            <div className="button-group-vertical">
                {
                    event.props.elements.map(element => {
                        return <button className={`button-link ${theme}`}
                                       onClick={() => handleElement(event, element)}>{element}</button>
                    })
                }
            </div>
        </div>
    )
}

function handleElement(event, element) {
    event.props.fetchTemplate(element);
}