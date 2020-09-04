import React, { Component } from 'react';
import AppNavbar from './AppNavbar';
import {withRouter} from 'react-router-dom';
import {Container} from 'reactstrap';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {darkTheme, managePreview} from "../utils/actions";

class Options extends Component {

    constructor(props) {
        super(props);
        this.state = {
            theme: props.theme
        }
    }

    setTheme(isDark) {
        this.props.darkTheme(isDark);
        this.setState({theme: isDark ? 'dark' : 'light'});
    }

    controlPreview(isEnabled) {
        this.props.managePreview(isEnabled);
    }

    render() {
        const {theme} = this.state;
        return (
            <div className={`background ${theme}`}>
                <AppNavbar/>
                <Container fluid>
                    <div>
                        <h3 className="button-group-vertical"> Theme:
                            <button className="button dark" onClick={() => this.setTheme(true)}>dark</button>
                            <button className="button light" onClick={() => this.setTheme(false)}>light</button>
                        </h3>
                    </div>
                    <div>
                        <h3 className="button-group-vertical"> Preview:
                            <button className={`button ${theme}`} onClick={() => this.controlPreview(true)}>ON</button>
                            <button className={`button ${theme}`} onClick={() => this.controlPreview(false)}>OFF</button>
                        </h3>
                    </div>
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

function matchDispatchToProps(dispatch) {
    return bindActionCreators({darkTheme : darkTheme, managePreview: managePreview}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(withRouter(Options));