import React from 'react';
import PrivateRoute from "./component/PrivateRoute"
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from "./layout/Home"
import Author from "./layout/Author"

const indexRoutes = ["/", "/login", "/register", "/profile",
  "/q-academy"
]

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
              case "/q-academy":
                return (<Route path={prop} key={key} component={Home} />)
              default:
                return (<PrivateRoute exact path={prop} component={null} authenticated={true} />)
            }
          })
        }
      </div>
    </Router>
  );
}

export default App;
