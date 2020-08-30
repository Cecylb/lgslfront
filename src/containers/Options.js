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
            theme: props.theme
        }
    }

    setTheme(isDark) {
        if (isDark) {
            document.body.style =
                `background-color: darkslategrey; color: floralwhite;`;
            this.props.darkTheme(true)
        } else {
            document.body.style =
                `background-color: white; color: black;`;
            this.props.darkTheme(false)
        }
    }

    render() {
        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                        <div className="btn-group-vertical">
                            <h1> Theme:
                                <button onClick={() => this.setTheme(true)}>dark</button>
                                <button onClick={() => this.setTheme(false)}>light</button>
                            </h1>
                        </div>
                    <div className="mb-auto">
                        <Button color="link"><Link to="/">Back</Link></Button>
                    </div>
                </Container>
            </div>
        );
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({darkTheme : darkTheme}, dispatch)
}

function mapStateToProps(state) {
    return {
        theme: state.themeDark
    };
}

export default connect(mapStateToProps, matchDispatchToProps)(withRouter(Options));