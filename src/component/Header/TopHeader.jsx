import React from 'react'
import './top-header.css'
import SectionInner from "../Container/SectionInner"

class TopHeader extends React.Component {
    render() {
        return (
            <div className="top-header-main">
                <SectionInner>
                    <div className="top-header-container">
                        <div className="top-header-left">
                            <img className="top-header-logo" src={require("../../assets/icon/logo.svg")} />
                        </div>
                        <div className="top-header-right">
                            <div className="top-header-search">
                                <img className="top-header-search-icon" src={require("../../assets/icon/ic_search.svg")} />
                                <input className="top-header-search-input" placeholder="Tìm kiếm" />
                            </div>
                            <div className="top-header-btn">
                                <span className="top-header-btn-text">Mua gói</span>
                            </div>
                            <div className="top-header-btn">
                                <span className="top-header-btn-text">Thành viên</span>
                            </div>
                        </div>
                    </div>

                </SectionInner>
            </div>
        )
    }
}

export default TopHeader;