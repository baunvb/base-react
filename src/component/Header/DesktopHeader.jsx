import React from "react";
import './header.css'
import { NavLink } from "react-router-dom";


class DesktopHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  activePath = (path) => {
    return this.props.location.pathname.indexOf(path) > -1 ? true : false;
  }

  componentDidMount() {

  }

  componentWillMount() {

  }

  render() {
    return (
      <div className="header-container">
        {
          this.props.router.map((item) => {
            var classItem = "nav-link";
            if (this.activePath(item.path)) classItem += " path-active"
            return (
              <NavLink
                className={classItem}
                to={item.path}
              >
                <div className="menu-item">
                  {item.name}
                </div>
              </NavLink>
            )
          })
        }
      </div>
    )
  }

}

export default DesktopHeader;