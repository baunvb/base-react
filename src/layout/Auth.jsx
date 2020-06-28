// Login - register screen

import React from "react";
import { AuthRouter } from "../router/AuthRouter"
import { Switch, Route, Redirect } from "react-router-dom";

const switchRoutes = (
  <Switch>
    {AuthRouter.map((prop, key) => {
      if (prop.redirect)
        return <Redirect from={prop.path} to={prop.pathTo} key={key} />;
      return <Route path={prop.path} component={prop.component} key={key} />;
    })}
  </Switch>
);


class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    console.log("AUTH")
  }


  render() {
    return (
      <div>
        <div className="main">
          {switchRoutes}
        </div>
      </div>
    )
  }

}

export default Auth;