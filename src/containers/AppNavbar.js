import React, { Component } from 'react';
import { Collapse, Nav, Navbar, NavbarToggler } from 'reactstrap';
import {withRouter} from 'react-router-dom';
import logoLgsl from '../images/logo.png'
import '../styles/AppNavbar.css';
import {connect} from "react-redux";
import {github, login, logo, menubar, twitter} from "./navbar/links";

class AppNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        const navbar = <Navbar color='secondary' light expand="md">
            {logo(logoLgsl)}
            <NavbarToggler onClick={this.toggle}/>
            <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    {menubar(this.props.user.loggedIn)}
                    {login(this.props.user.loggedIn, this.props.user.username)}
                    {twitter()}
                    {github()}
                </Nav>
            </Collapse>
        </Navbar>;
        return navbar;
    }
}

function mapState(state) {
    return {
        user: state.fetchReducer.user
    }
}

export default connect(mapState)(withRouter(AppNavbar))