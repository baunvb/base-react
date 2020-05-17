import React from "react";
import PublicHeader from "../component/Header/PublicHeader"
import { AuthorRouter } from "../router/AuthorRouter"
import { Switch, Route, Redirect } from "react-router-dom";

const switchRoutes = (
  <Switch>
    {AuthorRouter.map((prop, key) => {
      return <Route path={prop.path} component={prop.component} key={key} />;
    })}
  </Switch>
);


class Author extends React.Component {
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
        <PublicHeader router={AuthorRouter} {...this.props} />
        <div className="main">
          {switchRoutes}
        </div>
      </div>
    )
  }

}

export default Author;