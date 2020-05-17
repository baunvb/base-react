// base home screen for user logined
import React from "react";
import PrivateHeader from "../component/Header/PrivateHeader"
import { HomeRouter } from "../router/HomeRouter"
import { Switch, Route, Redirect } from "react-router-dom";

const switchRoutes = (
  <Switch>
    {HomeRouter.map((prop, key) => {
      return <Route path={prop.path} component={prop.component} key={key} />;
    })}
  </Switch>
);

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {

  }

  componentWillMount() {

  }

  render() {
    return (
      <div>
        <PrivateHeader router={HomeRouter} {...this.props} />
        <div className="main">
          {switchRoutes}
        </div>
      </div>
    )
  }

}

export default Home;