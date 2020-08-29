import React, { Component } from 'react';
import '../App.css';
import AppNavbar from '../navigation/AppNavbar';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';
import config from "../appconfig.json";

class Options extends Component {

    setColor(color) {
        switch (color) {
            case 'primary' :
                config.style.bar_color = 'primary';
                break;
            case 'secondary' :
                config.style.bar_color = 'secondary';
                break;
            case 'info' :
                config.style.bar_color = 'info';
                break;
        }
    }

    render() {
        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="btn-group-vertical">
                        <h1> Change color:
                            <Button color="primary" onClick={() => this.setColor('primary')}> primary </Button>
                            <Button color="secondary" onClick={() => this.setColor('secondary')}> secondary </Button>
                            <Button color="info" onClick={() => this.setColor('info')}> info </Button>
                        </h1>
                    </div>
                    <div className="mb-auto">
                        <Button color="link"><Link to="/">Back</Link></Button>
                    </div>
                </Container>
            </div>
        );
    }
}

export default Options;