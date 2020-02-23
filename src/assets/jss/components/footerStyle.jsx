// ##############################
// // // Footer styles
// #############################

import {
  defaultFont,
  container,
  containerFluid,
  primaryColor
} from "assets/jss/material-dashboard-pro-react.jsx";

const footerStyle = {
  block: {},
  left: {
    float: "left!important",
    display: "block"
  },
  right: {
    color: "#FFFFFF",
    margin: "0",
    fontSize: "14px",
    float: "right!important",
    padding: "15px"
  },
  anchor: {
    color: "#FFFFFF",
    cursor: "pointer",
  },
  footer: {
    height: "80px",
    backgroundColor: "#000",
    position: "fixed",
    width: "100%",
    bottom: "0",
    borderTop: "1px solid #e7e7e7",
    padding: "15px 0",
    ...defaultFont,
    zIndex: 4
  },
  container: {
    zIndex: 3,
    ...container,
    position: "relative"
  },
  containerFluid: {
    zIndex: 3,
    ...containerFluid,
    position: "relative"
  },
  a: {
    color: primaryColor,
    textDecoration: "none",
    backgroundColor: "transparent"
  },
  list: {
    marginBottom: "0",
    padding: "0",
    marginTop: "0"
  },
  inlineBlock: {
    display: "inline-block",
    padding: "0",
    width: "auto"
  },
  whiteColor: {
    "&,&:hover,&:focus": {
      color: "#FFFFFF"
    }
  }
};
export default footerStyle;
