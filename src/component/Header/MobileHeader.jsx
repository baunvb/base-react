import React from "react";
import './header.css'
import { NavLink } from "react-router-dom";
import IconMenu from '../../assets/icon/ic_menu.png'

class MobileHeader extends React.Component {

  render() {
    return (
      <div className="header-container">
        <div className="menu-mobile">
            <img className="icon-menu" src={IconMenu}/>
        </div>
      </div>
    );
  }
}

export default MobileHeader