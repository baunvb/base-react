// ##############################
// // // RegularCard styles
// #############################

import {defaultFont } from "assets/jss/material-dashboard-pro-react.jsx";

const regularCardStyle = {
  card: {
    display: "inline-block",
    position: "relative",
    width: "100%",
    paddingBottom: "20px",
    paddingTop: "20px",
    minHeight: "100vh",
    boxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.14)",
    borderRadius: "6px",
    color: "rgba(0, 0, 0, 0.87)",
    background: "#fff"
  },  

  cardPlain: {
    background: "transparent",
    boxShadow: "none"
  },
  cardHeader: {
    padding: "5px 5px 0",
    zIndex: "3"
  },
  cardTitle: {
    ...defaultFont,
    color: "#3C4858",
    textDecoration: "none",
    marginTop: "20px",
    marginBottom: "3px",
    fontSize: "1.3em",
    "& small": {
      fontWeight: "400",
      lineHeight: "1",
      color: "#777"
    }
  },
  right: {
    textAlign: "right"
  },
  left: {
    textAlign: "left"
  },
  center: {
    textAlign: "center"
  },
  cardSubtitle: {
    ...defaultFont,
    color: "#999999",
    fontSize: "14px",
    margin: "20px 0 10px"
  },
  cardContent: {
    padding: "0px 0px !important",
    position: "relative"
  }
};

export default regularCardStyle;
