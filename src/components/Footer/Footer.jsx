import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

// material-ui components
import withStyles from "material-ui/styles/withStyles";

import footerStyle from "assets/jss/components/footerStyle";

function Footer({ ...props }) {
  const { classes, fluid } = props;
  var container = cx({
    [classes.container]: !fluid,
    [classes.containerFluid]: fluid,
  });

  return (
    <footer className={classes.footer}>
      <div className={container}>
        <div className={classes.left}>
          
        </div>
        <p className={classes.right}>
          &copy; {1900 + new Date().getYear()}{" "}
          <a className={classes.anchor} href="https://upit.asia" target="_blank">
            Upde
          </a>
        </p>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
  fluid: PropTypes.bool,
  white: PropTypes.bool,
  rtlActive: PropTypes.bool
};

export default withStyles(footerStyle)(Footer);
