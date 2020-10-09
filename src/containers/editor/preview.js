import React from "react";
import {Document, Page} from "react-pdf/dist/entry.webpack";
import {loading} from "../props/loading";

export const preview = (editor) => {
    const {data, theme} =  editor.state;
    if(editor.props.loading) return (
        <div className="tool-group">
            {loading(theme)}
        </div>
    )
    return (
        <div className="pdf-group">
            {editor.props.preview && data.length !== 0
                ? <Document
                    file={data}>
                    <Page pageNumber={1} scale={0.8}/>
                </Document>
                : null}
        </div>
    )
}
