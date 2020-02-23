// ##############################
// // // LockScreenPage view styles
// #############################

const lockScreenPageStyle = {
  content: {
    paddingTop: "18vh",
    minHeight: "calc(100vh - 80px)",
    position: "relative",
    zIndex: "4"
  },
  customCardClass: {
    width: "240px",
    margin: "60px auto 0",
    color: "#FFFFFF",
    position: "absolute",
    left: "0",
    right: "0",
    display: "block",
    transform: "translate3d(0, 0, 0)",
    transition: "all 300ms linear"
  },
  cardHidden: {
    opacity: "0",
    transform: "translate3d(0, -60px, 0)"
  },
  customCardAvatarClass: {
    maxWidth: "90px",
    maxHeight: "90px",
    marginTop: "-45px"
  },
  customCardFooterClass: {
    border: "none",
    paddingTop: "0"
  },
  cả
};

export default lockScreenPageStyle;
