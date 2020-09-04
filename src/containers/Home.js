import React, { Component } from 'react';
import '../styles/App.css';
import AppNavbar from './AppNavbar';
import {Container} from 'reactstrap';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

class Home extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const theme = this.props.theme;
        return (
            <div className={`background ${theme}`}>
                <AppNavbar/>
                <Container fluid>
                    <h3> Here will be the documentation of this project</h3>
                    <p> And some other instructions on how to use it</p>
                </Container>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        theme: state.app.themeDark
    };
}

export default connect(mapStateToProps)(withRouter(Home));