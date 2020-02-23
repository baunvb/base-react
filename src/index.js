import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from './serviceWorker';
import { sessionService, sessionReducer } from 'redux-react-session';
import myReducer from 'reducer/Reducer.jsx'
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import App from 'views/Pages/App';
import axios from "axios";
import { host } from "config/host";
import "assets/scss/material-dashboard-pro-react.css";
import { createBrowserHistory } from "history";
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
//datime
//import "pickerjs/picker.js";
//import "pickerjs/picker.css";
const hist = createBrowserHistory();
// Add the sessionReducer

const validateSession = () => {
//  return true;
 return sessionService.loadUser()
    .then((value) => {
      console.log("current user", value)
      let token_id = value.token_id;
      return axios.post(host + "checkToken", {}, {
        headers: {
          "access_token": token_id
        }
      }).then(res => res.data.message);
    })
}
// Check token
const options = { redirectPath: '', driver: 'COOKIES', validateSession };

const store = createStore(myReducer, undefined, compose(applyMiddleware(thunkMiddleware)));

sessionService.initSessionService(store, options);

ReactDOM.render(
  <Provider store={store} history={hist}>
    <App />
  </Provider>,
  document.getElementById("root")
);
serviceWorker.unregister();
