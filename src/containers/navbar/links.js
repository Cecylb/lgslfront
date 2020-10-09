import {Button, Container, NavbarBrand, NavItem, NavLink} from "reactstrap";
import config from "../../appconfig.json";
import React from "react";
import {Link} from "react-router-dom";

export const logo = (logoLgsl) => {
    return (
        <NavbarBrand tag={Link} to="/">
            <img src={logoLgsl} width="15%" alt="Home"/>
        </NavbarBrand>
    )
}

export const menubar = (loggedIn) => {
    return (
        <Container fluid>
            <Link to="/editor"><Button color="light" outline className="editor">Create new scheme</Button></Link>
            <Link to="/options"> <Button color="light" outline className="options">Options</Button></Link>
            <Link to="/about"><Button color="light" outline className="about">About</Button></Link>
            { loggedIn
                ? <Link to="/load"><Button color="light" outline className="load">Load</Button></Link>
                : null
            }
        </Container>
    )
}

export const login = (loggedIn, username) => {
    return (
        <NavItem>
            <NavLink
                href='/login' style={{color: 'white'}}> {
                loggedIn
                    ? `Welcome, ${username}`
                    : 'Login'
                }
            </NavLink>
        </NavItem>
    )
}

export const twitter = () => {
    return (
        <NavItem>
            <NavLink
                href={config.links.twitter} style={{color: 'deepSkyBlue'}}>Twitter</NavLink>
        </NavItem>
    )
}

export const github = () => {
    return (
    <NavItem>
        <NavLink href={config.links.github} style={{color: 'gold'}}>GitHub</NavLink>
    </NavItem>
    )
}