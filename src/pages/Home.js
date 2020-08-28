import React, { Component } from 'react';
import '../App.css';
import AppNavbar from '../AppNavbar';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';

class Home extends Component {
    render() {
        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <Button color="link"><Link to="/editor">Create new scheme</Link></Button>
                    <Button color="link"><Link to="/options">Options</Link></Button>
                    <Button color="Link"><Link to="/about">About</Link></Button>
                </Container>
            </div>
        );
    }
}

export default Home;