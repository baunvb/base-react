import React from "react";
import HomeHeader from "../component/Header/HomeHeader"
import { HomeRouter } from "../router/HomeRouter"
import { Switch, Route, Redirect } from "react-router-dom";
import TopHeader from "../component/Header/TopHeader";
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
        <TopHeader />
        <HomeHeader router={HomeRouter} {...this.props} />
        <div className="main">
          {switchRoutes}
        </div>
      </div>
    )
  }

}

export default Home;