import React, { Component } from 'react';
import '../styles/App.css';
import AppNavbar from './AppNavbar';
import {Link, withRouter} from 'react-router-dom';
import {Button, Container, Table} from 'reactstrap';
import config from "../appconfig.json";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {darkTheme} from "../actions";

class Options extends Component {

    constructor(props) {
        super(props);
        this.state = {
            theme: props.theme ? 'dark' : 'light'
        }
    }

    setTheme(isDark) {
        document.body.style = isDark
            ? 'background-color: darkslategrey; color: floralwhite;'
            : 'background-color: white; color: black;';
        this.props.darkTheme(isDark)
    }

    render() {
        const {theme} = this.state;
        //ToDo кнопки меняют цвет не сразу
        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                        <div>
                            <h1 className="button-group"> Theme:
                                <button className="dark-button" onClick={() => this.setTheme(true)}>dark</button>
                                <button className="light-button" onClick={() => this.setTheme(false)}>light</button>
                            </h1>
                        </div>
                </Container>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        theme: state.themeDark
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({darkTheme : darkTheme}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(withRouter(Options));