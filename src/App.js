import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Editor from './pages/Editor'
import Options from "./pages/Options";
import About from "./pages/About";

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
