import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import {Container} from 'reactstrap';
import config from "../appconfig.json";
import {connect} from "react-redux";
import {fetchElements} from "../utils/actions";
import {loading} from "./props/loading";
import ShowAlert from "./props/alert";

class About extends Component {

    constructor(props) {
        super(props);
        this.state = {
            theme: localStorage.getItem('theme')
        }
        this.props.fetchElements();
    }

    render() {
        const {theme} = this.state;
        const list = this.props.elements.map(element => {
            return `${element} `
        });
        return (
            <div className={`background ${theme}`}>
                {this.props.alert ? <ShowAlert/> : null}
                <Container fluid>
                    <h2>Logic Gate Schematic Language</h2>
                    <p>Simple language for creating complicated schemes with logic gates</p>
                    <p>Author: <a href={config.links.vk}>Valeriy Mochalov</a></p>
                    <p>Supported elements: {this.props.loading
                        ? loading(theme)
                        : list} </p>
                </Container>
            </div>
        );
    }
}

function mapState(state) {
    return {
        loading: state.app.loading,
        alert: state.app.alert,
        elements: state.fetchReducer.elements
    };
}

const actions = {
    fetchElements: fetchElements
}

export default withRouter(connect(mapState, actions)(About));