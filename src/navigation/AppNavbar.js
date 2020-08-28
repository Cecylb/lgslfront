import React, { Component } from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import logo from '../logo.png'
import { Button, Container } from 'reactstrap';
import './AppNavbar.css';

export default class AppNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {isOpen: false};
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return <Navbar color="secondary" light expand="md">
            <NavbarBrand tag={Link} to="/">
                <img src={logo} width="15%" alt="Home"/>
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle}/>
            <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                <Container fluid>
                    <Button color="info" outline="danger" className="editor"><Link to="/editor" style={{color: 'yellowgreen'}}>Create new scheme</Link></Button>
                    <Button color="info" outline="danger" className="options"><Link to="/options" style={{color: 'yellowgreen'}}>Options</Link></Button>
                    <Button color="info" outline="danger" className="about"><Link to="/about" style={{color: 'yellowgreen'}}>About</Link></Button>
                </Container>
                    <NavItem>
                        <NavLink
                            href="https://twitter.com/cecylbcoceTb" style={{color: 'yellowgreen'}}>@cecylb</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="https://github.com/Cecylb" style={{color: 'yellowgreen'}}>GitHub</NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>;
    }
}