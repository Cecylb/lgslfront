import React from "react";
import {loading} from "../props/loading";

export const elements = (editor) => {
    const {theme} =  editor.state;
    if(editor.props.loading) return (
        <div className="tool-group">
            {loading(theme)}
        </div>
    )
    return (
        <div className="tool-group">
            <div className="button-group-vertical">
                {
                    editor.props.elements.map(element => {
                        return <button className={`button-link ${theme}`}
                                       onClick={() => handleElement(editor, element)}>{element}</button>
                    })
                }
            </div>
        </div>
    )
}

function handleElement(editor, element) {
    editor.props.fetchTemplate(element);
}