import React from 'react'
import './top-footer.css'
import SectionInner from "../Container/SectionInner"
import { NavLink } from "react-router-dom";
import { TopFooterRouter } from "../../router/TopFooterRouter"
class TopFooter extends React.Component {
    render() {
        return (
            <div className="top-footer-main">
                <SectionInner>
                    <div className="top-footer-wrap-flex">

                        {
                            TopFooterRouter.map((category, key) => {
                                return (
                                    <div key={key} className="top-footer-wrap-column">
                                        <span className="top-footer-title">{category.title}</span>
                                        {
                                            category.router.map((item, index) => {
                                                return (
                                                    <NavLink
                                                        className="top-footer-navlink"
                                                        to={item.link}
                                                    >
                                                        <span className="top-footer-link-text">{item.name}</span>
                                                    </NavLink>
                                                )
                                            })
                                        }
                                    </div>

                                )
                            })
                        }

                        </div>
                </SectionInner>
            </div>
        )
    }
}

export default TopFooter