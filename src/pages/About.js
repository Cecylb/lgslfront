import React, { Component } from 'react';
import '../App.css';
import AppNavbar from '../AppNavbar';
import { Link } from 'react-router-dom';
import {Button, Collapse, Container, Nav, NavItem, NavLink} from 'reactstrap';
import loading from "./loading.gif";

class About extends Component {

    constructor(props) {
        super(props);
        this.state = {
            elements: [],
            isLoading: true};
    }

    componentDidMount() {
        this.setState({isLoading: true});
        fetch('api/editor')
            .then(response => response.json())
            .then(data => this.setState({elements: data, isLoading: false}));
    }

    render() {
        const {elements, isLoading} = this.state;
        if (isLoading) return <img src ={loading} alt="Loading..."/>;
        const list = elements.map(element => {
            return `${element} `;
        });
        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <h2>Logic Gate Schematic Language</h2>
                    <p>Simple language for creating complicated schemes with logic gates</p>
                    <p>Author: <a href="https://vk.com/cecylb">Valeriy Mochalov</a></p>
                    <p>Supported elements: {list}</p>
                    <Button color="link"><Link to="/">Back</Link></Button>
                </Container>
            </div>
        );
    }
}

export default About;