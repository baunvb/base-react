import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from "history";

import Home from "./layout/Home"
import Auth from "./layout/Auth"

const indexRoutes = [
  
  {
    path: '/auth',
    component: Auth
  },

  //If add new layout, "/" router have to end of arr
  {
    path: '/',
    component: Home
  },

]

const hist = createBrowserHistory();

const App = () => {
  return (
    <Router history={hist}>
      <Switch>
      {
          indexRoutes.map((prop, key) => {           
            return <Route path={prop.path} component={prop.component} key={key} />
          })
        }
      </Switch>
    </Router>
  );
}

export default App;
