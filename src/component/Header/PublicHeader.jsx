import React from 'react';
import './public-header.css'
import { NavLink } from "react-router-dom";

class PublicHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="public-header-container">
        <div className="logo"></div>
        <div className="right-header">
          <div className="search"></div>
          <NavLink
            className="nav-link-public"
            to='#'
          >
            <div className="header-btn btn-course">Đăng ký tư vấn</div>
          </NavLink>

          <NavLink
            className="nav-link-public"
            to='/login'
          >
            <div className="header-btn btn-login">Đăng nhập</div>
          </NavLink>

          <NavLink
            className="nav-link-public"
            to='/register'
          >
            <div className="header-btn btn-register">Đăng ký</div>
          </NavLink>
        </div>
      </div>
    )
  }

}

export default PublicHeader