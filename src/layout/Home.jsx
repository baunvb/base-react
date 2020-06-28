import React from "react";
import HomeHeader from "../component/Header/HomeHeader"
import { HomeRouter } from "../router/HomeRouter"
import { Switch, Route, Redirect } from "react-router-dom";
import TopHeader from "../component/Header/TopHeader";
import TopFooter from "../component/Footer/TopFooter"
import Footer from "../component/Footer/Footer"

const switchRoutes = (
  <Switch>
    {HomeRouter.map((prop, key) => {
      if (prop.redirect)
        return <Redirect from={prop.path} to={prop.pathTo} key={key} />;
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
    console.log("HOME")
  }


  render() {
    return (
      <div>
        <TopHeader />
        <HomeHeader router={HomeRouter} {...this.props} />
        <div>
          {switchRoutes}
        </div>
        <TopFooter />
        <Footer />
      </div>
    )
  }

}

export default Home;