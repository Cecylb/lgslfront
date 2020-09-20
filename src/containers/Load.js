import React from "react";
import {withRouter} from "react-router-dom";

const {Component} = require("react");

class Load extends Component {

    render() {
        const theme = localStorage.getItem('theme');
        return (
            <div className={`background ${theme}`}>
                <h3>A page for loading saved code for logged users, WIP</h3>
            </div>
        );
    }
}

export default withRouter(Load)