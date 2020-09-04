import React from "react";
import AppNavbar from "../../containers/AppNavbar";

export const loading = (theme) => {
     return (
        <div className={`background ${theme}`}>
            <AppNavbar/>
            <div className={`lds-dual-ring ${theme}`}/>
        </div>
    );
}