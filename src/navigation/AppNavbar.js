import React, { Component } from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import logo from '../logo.png'
import { Button, Container } from 'reactstrap';
import './AppNavbar.css';

export default class AppNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
        };
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
                    <Link to="/editor"><Button color="light" outline="danger" className="editor">Create new scheme</Button></Link>
                    <Link to="/options"> <Button color="light" outline="danger" className="options">Options</Button></Link>
                    <Link to="/about"><Button color="light" outline="danger" className="about">About</Button></Link>
                </Container>
                    <NavItem>
                        <NavLink
                            href="https://twitter.com/cecylbcoceTb" style={{color: 'deepSkyBlue'}}>Twitter</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="https://github.com/Cecylb" style={{color: 'gold'}}>GitHub</NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>;
    }
}