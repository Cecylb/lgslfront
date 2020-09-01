import React from "react";
import AppNavbar from "../containers/AppNavbar";

export const loading = (theme) => {
     return (
        <div className={`background ${theme}`}>
            <AppNavbar/>
            <div className={`lds-dual-ring ${theme}`}/>
        </div>
    );
}

export async function fetchElements() {
    return await fetch('api/editor')
        .then(response => response.json())
        .then(data => {
            return data
        });
}