import React from "react";

export const loading = (theme) => {
     return (
        <div className={`background ${theme}`}>
            <div className={`lds-dual-ring ${theme}`}/>
        </div>
    );
}