import React from "react";

// material-ui components
import withStyles from "material-ui/styles/withStyles";
import Grid from "material-ui/Grid";

const style = {
  grid: {
    width: "100% + 30px)"
  }
};

function GridContainer({ ...props }) {
  const { classes, children, className, ...rest } = props;
  return (
    <Grid container {...rest} className={classes.grid + " " + className}>
      {children}
    </Grid>
  );
}

export default withStyles(style)(GridContainer);
