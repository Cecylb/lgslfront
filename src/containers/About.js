import React, { Component } from 'react';
import AppNavbar from './AppNavbar';
import {withRouter} from 'react-router-dom';
import {Container} from 'reactstrap';
import config from "../appconfig.json";
import {connect} from "react-redux";
import {fetchElements} from "../utils/actions";
import {loading} from "../utils/templates/loading";

class About extends Component {

    constructor(props) {
        super(props);
        this.state = {
            theme: props.theme ? 'dark' : 'light',
            elements: []
        };
        this.props.fetchElements();
    }

    render() {
        const {theme, elements, isLoading} = this.state;
        if(this.props.loading) return loading(theme);
        const list = this.props.elements.map(element => {
            return `${element} `
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

function mapState(state) {
    return {
        theme: state.app.themeDark,
        loading: state.app.loading,
        elements: state.fetchReducer.elements
    };
}

const actions = {
    fetchElements: fetchElements
}

export default connect(mapState, actions)(withRouter(About));