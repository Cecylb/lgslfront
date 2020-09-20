import React from "react";
import {Document, Page} from "react-pdf/dist/entry.webpack";

export const preview = (cond, data) => (
<div className="pdf-group">
    {cond
    ? <Document
            file={data}>
            <Page pageNumber={1} scale={0.8}/>
        </Document>
    : null}
</div>
)