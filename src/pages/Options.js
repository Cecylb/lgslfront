import React, { Component } from 'react';
import '../App.css';
import AppNavbar from '../navigation/AppNavbar';
import { Link } from 'react-router-dom';
import {Button, Container, Table} from 'reactstrap';
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

    setTheme(theme) {
        switch (theme) {
            case 'light' :
                config.style.isDark = false;
                document.body.style =
                    `background-color: ${config.style.light_theme.background}; color: ${config.style.light_theme.text};`;
                break;
            case 'dark' :
                config.style.isDark = true;
                document.body.style =
                    `background-color: ${config.style.dark_theme.background}; color: ${config.style.dark_theme.text};`;
                break;
        }
    }

    render() {
        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <Table>
                        <th className="btn-group-vertical">
                            <h1> Change color:
                                <Button color="primary" onClick={() => this.setColor('primary')}> primary </Button>
                                <Button color="secondary" onClick={() => this.setColor('secondary')}> secondary </Button>
                                <Button color="info" onClick={() => this.setColor('info')}> info </Button>
                            </h1>
                        </th>
                        <th className="btn-group-vertical">
                            <h1> Theme:
                                <Button color="light" onClick={() => this.setTheme('light')}> light </Button>
                                <Button color="dark" onClick={() => this.setTheme('dark')}> dark </Button>
                            </h1>
                        </th>
                    </Table>
                    <div className="mb-auto">
                        <Button color="link"><Link to="/">Back</Link></Button>
                    </div>
                </Container>
            </div>
        );
    }
}

export default Options;