import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// material-ui components
import withStyles from "material-ui/styles/withStyles";
// core components
import Header from "components/Header/Header.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";
import dashboardRoutes from "routes/home.jsx";
import appStyle from "assets/jss/layouts/dashboardStyle.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import ItemGrid from "components/Grid/ItemGrid.jsx";
import JssProvider from 'react-jss/lib/JssProvider';
import { createGenerateClassName } from '@material-ui/core/styles';
const generateClassName = createGenerateClassName({
  productionPrefix: 'dashboardx',
});

const switchRoutes = (
  <Switch>
    {dashboardRoutes.map((prop, key) => {
      if (prop.redirect)
        return <Redirect from={prop.path} to={prop.pathTo} key={key} />;
      if (prop.collapse)
        return prop.views.map((prop, key) => {
          return (
            <Route path={prop.path} component={prop.component} key={key} />
          );
        });
      return <Route path={prop.path} component={prop.component} key={key} />;
    })}
  </Switch>
);

var ps;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
      miniActive: false
    };
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  getRoute() {
    return this.props.location.pathname !== "/maps/full-screen-maps";
  }
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      // eslint-disable-next-line
      ps = new PerfectScrollbar(this.refs.mainPanel, {
        suppressScrollX: true,
        suppressScrollY: false
      });
    }

  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
  }

  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.refs.mainPanel.scrollTop = 0;
    }
  }
  sidebarMinimize() {
    this.setState({ miniActive: !this.state.miniActive });
  }
  render() {
    const { classes, ...rest } = this.props;

    const mainPanel =
      classes.mainPanel +
      " " +
      cx({
        [classes.mainPanelSidebarMini]: this.state.miniActive,
        [classes.mainPanelWithPerfectScrollbar]:
          navigator.platform.indexOf("Win") > -1
      });
    return (
      <div className={classes.wrapper}>

        <JssProvider generateClassName={generateClassName}>

          <Sidebar
            routes={dashboardRoutes}
            handleDrawerToggle={this.handleDrawerToggle}
            open={this.state.mobileOpen}
            color="blue"
            bgColor="white"
            miniActive={this.state.miniActive}
            {...rest}
          />
        </JssProvider>
        <div className={mainPanel} ref="mainPanel">
          <JssProvider generateClassName={generateClassName}>

            <Header
              sidebarMinimize={this.sidebarMinimize.bind(this)}
              miniActive={this.state.miniActive}
              routes={dashboardRoutes}
              handleDrawerToggle={this.handleDrawerToggle}
              {...rest}
            />
          </JssProvider>

          <GridContainer justify="center">
            <ItemGrid sm={12} xs={12} lg={12} md={12}>
              {this.getRoute() ? (
                <div className={classes.content}>
                  <div className={classes.container}>{switchRoutes}</div>
                </div>
              ) : (
                  <div className={classes.map}>{switchRoutes}</div>
                )}
            </ItemGrid>
          </GridContainer>

          {null}
        </div>

      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};


export default withStyles(appStyle)(Home)
