// This component handles the App template used on every page.
import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Dashboard from "layouts/Dashboard.jsx";

import Pages from "layouts/Pages.jsx";
import PrivateRoute from 'views/Pages/PrivateRoute';

const indexRoutes = ["/", "/home", "/addNewAppoinment", "/completebooking", "/confirmbooking", "/profile", "/dashboard", "/login", "/forgetpassword", "/updatepassword", "/updateinfo", "/history", "/booking", "/tracking", "/booking-submit", "/confirmation"]
const App = ({ authenticated, checked }) => (
  <Router>
    {checked &&
      <div>
        {
          indexRoutes.map((prop, key) => {
            switch (prop) {
              case "":
                break;
              case "/login":
              case "/forgetpassword":
                return (<Route path={prop} key={key} component={Pages} />)
              default:
                return (<PrivateRoute exact path={prop} component={Dashboard} authenticated={true} />)
            }
          })
        }
      </div>
    }
  </Router>
);

const { bool } = PropTypes;

App.propTypes = {
  authenticated: bool.isRequired,
  checked: bool.isRequired
};

const mapState = ({ session }) => ({
  checked: session.checked,
  authenticated: session.authenticated
});

export default connect(mapState)(App);
