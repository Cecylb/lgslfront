import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import {applyMiddleware, compose, createStore} from "redux";
import reducers from './utils/reducers';
import {Provider} from "react-redux";
import createSagaMiddleware from "redux-saga";
import sagaWatcher from "./utils/sagas";

const saga = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(saga));

saga.run(sagaWatcher);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
