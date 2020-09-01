import React, { Component } from 'react';
import AppNavbar from './AppNavbar';
import {withRouter} from 'react-router-dom';
import {Container} from 'reactstrap';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {darkTheme} from "../utils/actions";

class Options extends Component {

    constructor(props) {
        super(props);
        this.state = {
            theme: props.theme ? 'dark' : 'light'
        }
    }

    setTheme(isDark) {
        this.props.darkTheme(isDark)
        this.setState({theme: isDark ? 'dark' : 'light'});
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