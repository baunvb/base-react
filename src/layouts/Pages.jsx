import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// material-ui components
import withStyles from "material-ui/styles/withStyles";

// core components
import PagesHeader from "components/Header/PagesHeader.jsx";
import pagesRoutes from "routes/pages.jsx";

class Pages extends React.Component {

  render() {
    return (
      <div>
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
           
      </div>
    );
  }
}


export default Pages;
