import React, { Component } from 'react';
import '../styles/App.css';
import {Container} from 'reactstrap';
import {withRouter} from "react-router-dom";

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            theme: localStorage.getItem('theme')
        }
    }

    render() {
        const {theme} = this.state;
        return (
            <div className={`background ${theme}`}>
                <Container fluid>
                    <div>
                        <div>
                            <h3> Here will be the documentation of this project</h3>
                            <p> And some other instructions on how to use it</p>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }
}

export default withRouter(Home);