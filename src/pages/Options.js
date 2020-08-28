import React, { Component } from 'react';
import '../App.css';
import AppNavbar from '../AppNavbar';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';

class Options extends Component {
    render() {
        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <h3>Work in progress...</h3>
                    <Button color="link"><Link to="/">Back</Link></Button>
                </Container>
            </div>
        );
    }
}

export default Options;