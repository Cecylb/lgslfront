import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import Editor from './Editor'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
            <Route path='/' exact={true} component={Home}/>
            <Route path='/editor' exact={true} component={Editor}/>
          </Switch>
        </Router>
    )
  }
}

export default App;
