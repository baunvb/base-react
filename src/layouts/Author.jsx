import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// core components
import pagesRoutes from "routes/author.jsx";

class Author extends React.Component {

  render() {
    return (

      <Switch>
        {pagesRoutes.map((prop, key) => {
          if (prop.collapse) {
            return null;
          }
          if (prop.redirect) {
            return (
              <Redirect from={prop.path} to={prop.pathTo} key={key} />
            );
          }
          return (
            <Route
              path={prop.path}
              component={prop.component}
              key={key}
            />
          );
        })}
      </Switch>

    );
  }
}


export default Author;
