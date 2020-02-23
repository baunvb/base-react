import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logout } from 'actions/sessionActions';
import { ListItemText } from 'material-ui';
const LogoutButton = ({ history, logout }) => (
  <ListItemText
    onClick={() => logout(history)}
    primary={"Đăng xuất"}
    disableTypography={true}
  >
  </ListItemText>

);

const { object, func } = PropTypes;

LogoutButton.propTypes = ({
  history: object.isRequired,
  logout: func.isRequired
});

const mapDispatch = dispatch => ({
  logout: history => dispatch(logout(history))
});

export default connect(null, mapDispatch)(withRouter(LogoutButton));
