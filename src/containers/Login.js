import React, { Component} from 'react';
import {Redirect, withRouter} from 'react-router-dom';
import {Button} from "reactstrap";
import {connect} from "react-redux";
import {fetchUser} from "../utils/actions";

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            login: "",
            password: "",
            user: props.user
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.user !== prevProps.user) {
            this.setState({user: this.props.user});
        }
    }

    handleSubmit(event) {
        console.log("HERE?")
        event.preventDefault();
        this.props.fetchUser(this.state.login, this.state.password);
    }

    handleChange(event) {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        const theme = localStorage.getItem('theme');
        console.log("LOGGED", this.state.user.loggedIn);
        if(this.state.user.loggedIn) {
            return <Redirect to="/"/>
        }
        return (
            <div className={`background ${theme}`}>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <input
                            type='text'
                            placeholder='login . . .'
                            name='login'
                            onChange={this.handleChange}
                            required/>
                        <input
                            type='password'
                            pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}'
                            title='password must contain 8-16 symbols both of upper and lower case and a number'
                            placeholder='password . . .'
                            name='password'
                            onChange={this.handleChange}
                            required/>
                        <Button color="success" type="submit">Login</Button>
                    </form>
                </div>
            </div>
        )
    }
}

function mapState(state) {
    return {
        user: state.fetchReducer.user
    };
}

const actions = {
    fetchUser: fetchUser
}

export default withRouter(connect(mapState, actions)(Login));