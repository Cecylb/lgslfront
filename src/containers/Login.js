import React, { Component} from 'react';
import {Redirect, withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import {fetchUser} from "../utils/actions";

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            theme: localStorage.getItem('theme'),
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
        const {theme, user} = this.state;
        if(user.loggedIn) {
            return <Redirect to="/"/>
        }
        return (
            <div className={`background ${theme}`}>
                <div className='text-center'>
                    <form className='form-signin' onSubmit={this.handleSubmit}>
                        <h3> Sign in to access saved code</h3>
                        <input
                            className='form-control'
                            type='text'
                            pattern='(?=.*[a-zA-Z0-9]).{4,16}'
x                           title='login should contain 4-16 symbols of plain letters and numbers'
                            placeholder='login . . .'
                            name='login'
                            onChange={this.handleChange}
                            required/>
                        <input
                            className='form-control'
                            type='password'
                            pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}'
                            title='password must contain 8-16 symbols both of upper and lower case and a number'
                            placeholder='password . . .'
                            name='password'
                            onChange={this.handleChange}
                            required/>
                        <div class='checkBox mb-3'>
                            <label>
                                <input type='checkBox' value='remember-me'/> Remember me

                            </label>
                        </div>
                        <button class='btn btn-lg btn-primary btn-block' type="submit">Sign in</button>
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