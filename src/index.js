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
import { getCookie } from 'common/function.jsx'

import '@mobiscroll/react/dist/css/mobiscroll.min.css';
// import {validateSession} from 'common/function.jsx'

//datime
//import "pickerjs/picker.js";
//import "pickerjs/picker.css";
const hist = createBrowserHistory();
// Add the sessionReducer

const validateSession = () => {
  const token_id = getCookie("token");
   //return true;
   return axios.post(host + "api/station/checktoken", {}, {
    headers: {
      "authorization": "Bearer " + token_id
    }
  }).then(res => res.data.code === 200);
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
