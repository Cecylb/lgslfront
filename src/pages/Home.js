import React, { Component } from 'react';
import '../App.css';
import AppNavbar from '../navigation/AppNavbar';
import {Container} from 'reactstrap';

class Home extends Component {
    render() {
        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <h3> Here will be the documentation of this project</h3>
                    <p> And some other instructions on how to use it</p>
                </Container>
            </div>
        );
    }
}

export default Home;