import React, { Component } from 'react';
import AppNavbar from './AppNavbar';
import {withRouter} from 'react-router-dom';
import {Container} from 'reactstrap';
import {fetchElements} from "../utils/Utils";
import config from "../appconfig.json";
import {connect} from "react-redux";

class About extends Component {

    constructor(props) {
        super(props);
        this.state = {
            theme: props.theme ? 'dark' : 'light',
            elements: [],
            isLoading: true};
    }

    async componentDidMount() {
        this.setState({isLoading: true});
        await fetchElements()
            .then(data => this.setState({elements: data, isLoading: false}));
    }

    render() {
        const {theme, elements, isLoading} = this.state;
        if (isLoading) return (
            <div className={`background ${theme}`}>
                <AppNavbar/>
                <div className={`lds-dual-ring ${theme}`}/>
            </div>
        );
        const list = elements.map(element => {
            return `${element} `;
        });
        return (
            <div className={`background ${theme}`}>
                <AppNavbar/>
                <Container fluid>
                    <h2>Logic Gate Schematic Language</h2>
                    <p>Simple language for creating complicated schemes with logic gates</p>
                    <p>Author: <a href={config.links.vk}>Valeriy Mochalov</a></p>
                    <p>Supported elements: {list}</p>
                </Container>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        theme: state.themeDark
    };
}

export default connect(mapStateToProps)(withRouter(About));