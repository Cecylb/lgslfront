import React, { Component } from 'react';
import '../styles/App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './Home';
import Editor from './Editor'
import Options from "./Options";
import About from "./About";

class App extends Component {

  render() {
    return (
        <Router>
          <Switch>
            <Route path='/' exact={true} component={Home}/>
            <Route path='/editor' exact={true} component={Editor}/>
            <Route path='/options' exact={true} component={Options}/>
            <Route path='/about' exact={true} component={About}/>
          </Switch>
        </Router>
    )
  }
}

export default App;
