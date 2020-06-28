import React from "react";
import './home-header.css'
import { NavLink } from "react-router-dom";
import SectionInner from "../Container/SectionInner"

class HomeHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    activePath = (path) => {
        const pathName = this.props.location.pathname;
        if(pathName === "/") {
            if(path === "/") return true
        } else {
            if (path === "/") return false
            return this.props.location.pathname.indexOf(path) > -1  ? true : false;
        }
    }

    componentDidMount() {

    }


    render() {
        const {router} = this.props;
        return (
            <div className="home-header-main">
                <SectionInner>
                    <div className="home-header-container">
                        {
                            router.map((item, index) => {
                                var classItem = "home-header-nav-link home-header-nav-link-border-right";
                                if(index === router.length - 1) classItem = "home-header-nav-link"
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
                </SectionInner>
            </div>


        )
    }

}

export default HomeHeader;