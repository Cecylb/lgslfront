import React, { Component } from 'react';
import '../styles/App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from "./Home";
import Editor from "./Editor"
import Options from "./Options";
import About from "./About";
import Login from "./Login";
import AppNavbar from "./AppNavbar";
import Load from "./Load";

class App extends Component {

  render() {
    return (
        <Router>
            <div>
                <AppNavbar/>
                <Switch>
                    <Route path='/' exact={true} component={Home}/>
                    <Route path='/editor' exact={true} component={Editor}/>
                    <Route path='/options' exact={true} component={Options}/>
                    <Route path='/about' exact={true} component={About}/>
                    <Route path='/login' exact={true} component={Login}/>
                    <Route path='/load' exact={true} component={Load}/>
                </Switch>
            </div>
        </Router>
    )
  }
}

export default App;
