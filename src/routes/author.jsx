// import PricingPage from "views/Pages/PricingPage.jsx";
import LoginPage from "views/Pages/LoginPage.jsx";
import ForgotPassword from "views/Pages/ForgotPassword.jsx";
// material-ui-icons
import Fingerprint from "material-ui-icons/Fingerprint";
// import MonetizationOn from "material-ui-icons/MonetizationOn";

const pagesRoutes = [
  {
    path: "/login",
    name: "Login Page",
    short: "Login",
    mini: "LP",
    icon: Fingerprint,
    component: LoginPage
  },
  {
    path: "/forgetpassword",
    name: "Forget password",
    short: "Login",
    mini: "LP",
    icon: Fingerprint,
    component: ForgotPassword
  }
];

export default pagesRoutes;
