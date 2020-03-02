import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import './header.css'
// material-ui components
import withStyles from "material-ui/styles/withStyles";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import IconButton from "material-ui/IconButton";
import Button from "material-ui/Button";
import Hidden from "material-ui/Hidden";

// material-ui icons
import Menu from "material-ui-icons/Menu";
import MoreVert from "material-ui-icons/MoreVert";
import ViewList from "material-ui-icons/ViewList";

// core components
import CustomIconButton from "components/CustomButtons/IconButton.jsx";

import headerStyle from "assets/jss/components/headerStyle.jsx";
import ToolbarIcon from "assets/img/wlicon/logo_toolbar.svg"
function Header({ ...props }) {
  function makeBrand() {
    var name;
    props.routes.map((prop, key) => {
      if (prop.collapse) {
        prop.views.map((prop, key) => {
          if (prop.path === props.location.pathname) {
            name = prop.name;
          }
          return null;
        });
      }
      if (prop.path === props.location.pathname) {
        name = prop.name;
      }
      return null;
    });
    return ""; //baunv return name
  }
  const { classes, color, rtlActive, position } = props;
  const appBarClasses = cx({
    [" " + classes[color]]: color,
  });
  const positionClass = {
    "position": position,
  }

  const sidebarMinimize =
    classes.sidebarMinimize +
    " " +
    cx({
      [classes.sidebarMinimizeRTL]: rtlActive
    });
  return (
    <AppBar style={positionClass} className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <Hidden smDown>
          <div className={sidebarMinimize}>
            {props.miniActive ? (
              <CustomIconButton color="white" onClick={props.sidebarMinimize}>
                <ViewList className={classes.sidebarMiniIcon} />
              </CustomIconButton>
            ) : (
              <CustomIconButton color="white" onClick={props.sidebarMinimize}>
                <MoreVert className={classes.sidebarMiniIcon} />
              </CustomIconButton>
            )}
          </div>
        </Hidden>


        <Hidden mdUp>
          <IconButton
            className={classes.appResponsive}
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}
          >
            <Menu />
          </IconButton>
          <div className="wrap-logo">
              <img className="icon-toolbar" src={ToolbarIcon} />
          </div>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  rtlActive: PropTypes.bool
};

export default withStyles(headerStyle)(Header);
