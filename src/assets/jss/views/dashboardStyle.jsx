// ##############################
// // // Dashboard View styles
// #############################

import {
  successColor,
  tooltip
} from "assets/jss/material-dashboard-pro-react.jsx";

const dashboardStyle = {
  wraperCard: {
    borderRadius: "5px",
    position: "relative",
    minHeight: "100vh",
    width: "100%",
    padding: "20px 4px",
    margin: "0px 0px",
    boxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.14)",
    color: "rgba(0, 0, 0, 0.87)",
    background: "#fff"
},
  successText: {
    color: successColor
  },
  upArrowCardCategory: {
    width: 14,
    height: 14
  },
  underChartIcons: {
    width: "17px",
    height: "17px"
  },
  cardContentRight: {
    position: "relative",
    textAlign: "right"
  },
  cardContentLeft: {
    position: "relative",
    textAlign: "left"
  },
  textContent: {
    marginTop: "0px",
    margintBottom: "30px",
    textAlign: "center"
  },
  priceContent: {
    marginTop: "10px",
  },
  price: {
    color: "#FF7900",
    fontSize: "25px",
    fontWeight: "700"
  },
  chuyenxe: {
    color: "#000000",
    fontSize: "20px",
    fontWeight: "500"
  },
  date: {
    fontSize: "16px"
  },

  select: {
    border: "1px solid black",
    borderRadius: "20px",
    paddingLeft: "5px",
    paddingTop: "2px",
    paddingBottom: "2px",
  },
  tooltip
};

export default dashboardStyle;
