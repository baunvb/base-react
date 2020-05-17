import React from 'react';
import PrivateRoute from "./component/PrivateRoute"
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from "./layout/Home"
import Author from "./layout/Author"

const indexRoutes = ["/", "/login", "/register", "/home", "/profile"]

const App = () => {
  return (
    <Router>
      <div>
        {
          indexRoutes.map((prop, key) => {
            switch (prop) {
              case "":
                break;
              case "/login":
              case "/register":
                return (<Route path={prop} key={key} component={Author} />)
              default:
                return (<PrivateRoute exact path={prop} component={Home} authenticated={true} />)
            }
          })
        }
      </div>
    </Router>
  );
}

export default App;
