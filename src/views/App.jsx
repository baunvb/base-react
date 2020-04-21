// This component handles the App template used on every page.
import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from "layouts/Home.jsx";

import Author from "layouts/Author.jsx";
import PrivateRoute from 'views/Pages/PrivateRoute';

const indexRoutes = ["/", "/home", "/addNewAppoinment", "/completebooking", "/confirmbooking", "/bookingdetail", "/profile", "/dashboard", "/login", "/forgetpassword", "/updatepassword", "/updateinfo", "/history", "/booking", "/tracking", "/booking-submit", "/confirmation",
  "/admin/addstation"
]
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
                return (<Route path={prop} key={key} component={Author} />)
              default:
                return (<PrivateRoute exact path={prop} component={Home} authenticated={authenticated} />)
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
