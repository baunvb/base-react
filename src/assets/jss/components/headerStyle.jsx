// ##############################
// // // Header styles
// #############################

import {
  containerFluid,
  defaultFont,
  primaryColor,
  defaultBoxShadow,
  infoColor,
  successColor,
  warningColor,
  dangerColor
} from "assets/jss/material-dashboard-pro-react.jsx";

const headerStyle = theme => ({
  appBar: {
    padding: "1% 0px",
    marginBottom: "10px",
    backgroundColor: "#EEEEEE",
    boxShadow: "none",
    borderBottom: "0",
    width: "100%",
    zIndex: "1029",
    position: "fixed",
    color: "#555555",
    border: "0",
    transition: "all 150ms ease 0s",
    minHeight: "50px",
    display: "block",
    position: "absolute",
    "@media (min-width: 320px) and (max-width: 768px)": {
      position: "fixed",
      boxShadow: "0 0 3px 0 rgba(0, 0, 0, 0.26)",
      backgroundColor: "#FFFFFF",
    },
  },
  container: {
    ...containerFluid,
    minHeight: "50px"
  },
  flex: {
    flex: 1
  },
  title: {
    ...defaultFont,
    lineHeight: "30px",
    fontSize: "18px",
    borderRadius: "3px",
    textTransform: "none",
    color: "inherit",
    "&:hover,&:focus": {
      background: "transparent"
    }
  },
  primary: {
    backgroundColor: primaryColor,
    color: "#FFFFFF",
    ...defaultBoxShadow
  },
  info: {
    backgroundColor: infoColor,
    color: "#FFFFFF",
    ...defaultBoxShadow
  },
  success: {
    backgroundColor: successColor,
    color: "#FFFFFF",
    ...defaultBoxShadow
  },
  warning: {
    backgroundColor: warningColor,
    color: "#FFFFFF",
    ...defaultBoxShadow
  },
  danger: {
    backgroundColor: dangerColor,
    color: "#FFFFFF",
    ...defaultBoxShadow
  },
  sidebarMinimize: {
    float: "left",
    padding: "0 0 0 0",
    display: "block",
    color: "#555555"
  },
  sidebarMinimizeRTL: {
    padding: "0 15px 0 0 !important"
  },
  sidebarMiniIcon: {
    width: "20px",
    height: "17px"
  }
});

export default headerStyle;
