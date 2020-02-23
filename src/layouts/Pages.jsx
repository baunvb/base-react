import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";

// material-ui components
import withStyles from "material-ui/styles/withStyles";

// core components
import PagesHeader from "components/Header/PagesHeader.jsx";
import pagesRoutes from "routes/pages.jsx";
import pagesStyle from "assets/jss/layouts/pagesStyle.jsx";


// var ps;

class Pages extends React.Component {
  componentDidMount() {
    // if (navigator.platform.indexOf("Win") > -1) {
    //   ps = new PerfectScrollbar(this.refs.wrapper, {
    //     suppressScrollX: true,
    //     suppressScrollY: false
    //   });
    // }
  }
  componentWillUnmount() {
    // if (navigator.platform.indexOf("Win") > -1) {
    //   ps.destroy();
    // }
  }
  render() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        <PagesHeader {...rest} />
        <div className={classes.wrapper} ref="wrapper">
          <div className={classes.fullPage}>
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
            <div
              className={classes.fullPageBackground}
              style={{ background: "#FFF"}}
            />
          </div>
        </div>
      </div>
    );
  }
}

Pages.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(pagesStyle)(Pages);
