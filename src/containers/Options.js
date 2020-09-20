import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import {Container} from 'reactstrap';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {managePreview} from "../utils/actions";
import {previewToggle, themeToggle} from "./options/toggles";

class Options extends Component {

    constructor(props) {
        super(props);
        this.state = {
            theme: localStorage.getItem('theme')
        }
    }

    render() {
        const {theme} = this.state;
        return (
            <div className={`background ${theme}`}>
                <Container fluid>
                    {themeToggle(this)}
                    {previewToggle(this)}
                </Container>
            </div>
        );
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({managePreview: managePreview}, dispatch)
}

export default withRouter(connect(null, matchDispatchToProps)(Options));