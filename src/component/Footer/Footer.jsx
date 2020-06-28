import React from 'react'
import './footer.css'
import SectionInner from "../Container/SectionInner"
import { NavLink } from "react-router-dom";

class Footer extends React.Component {
    render() {
        return (
            <div className="footer-main">
                <SectionInner>
                    <img className="footer-logo" src={require("../../assets/icon/logo.svg")} />

                    <div className="footer-wrap-flex">
                        <div className="footer-wrap-column">
                            <span className="footer-column-title">Truyền thông về Questacon</span>
                            <NavLink
                                className="footer-navlink"
                                to=""
                            >
                                <span className="footer-column-link">Giới thiệu về Trung tâm SundayQ</span>
                            </NavLink>
                            <NavLink
                                className="footer-navlink"
                                to=""
                            >
                                <span className="footer-column-link">Các Đối tác chiến lược</span>
                            </NavLink>
                            <NavLink
                                className="footer-navlink"
                                to=""
                            >
                                <span className="footer-column-link">Hội đồng chuyên môn</span>
                            </NavLink>
                            <NavLink
                                className="footer-navlink"
                                to=""
                            >
                                <span className="footer-column-link">Hội đồng Quản trị</span>
                            </NavLink>
                            <NavLink
                                className="footer-navlink"
                                to=""
                            >
                                <span className="footer-column-link">Giới thiệu về Trung tâm SundayQ</span>
                            </NavLink>
                        </div>
                        <div className="footer-wrap-column">
                            <span className="footer-column-title">Cùng với chúng tôi</span>
                            <div className="footer-wrap-social-icon">
                                <img className="footer-social-icon" src={require("../../assets/icon/instagram.svg")} />
                                <img className="footer-social-icon" src={require("../../assets/icon/facebook.svg")} />
                                <img className="footer-social-icon" src={require("../../assets/icon/twitter.svg")} />
                                <img className="footer-social-icon" src={require("../../assets/icon/youtube.svg")} />
                                <img className="footer-social-icon" src={require("../../assets/icon/linkedin.svg")} />

                            </div>
                            <NavLink
                                className="footer-navlink"
                                to=""
                            >
                                <span className="footer-column-link">Tính pháp lý</span>
                            </NavLink>
                            <NavLink
                                className="footer-navlink"
                                to=""
                            >
                                <span className="footer-column-link">Thông tin tự do minh bạch</span>
                            </NavLink>
                            <NavLink
                                className="footer-navlink"
                                to=""
                            >
                                <span className="footer-column-link">Chương trình giáo dục quốc gia</span>
                            </NavLink>
                        </div>
                        <div className="footer-wrap-column">
                            <NavLink
                                className="footer-navlink"
                                to=""
                            >
                                <span className="footer-column-link">Trang chủ</span>
                            </NavLink>
                            <NavLink
                                className="footer-navlink"
                                to=""
                            >
                                <span className="footer-column-link">Thành viên Sunday Q</span>
                            </NavLink>
                            <NavLink
                                className="footer-navlink"
                                to=""
                            >
                                <span className="footer-column-link">Mua vé/mua khóa học</span>
                            </NavLink>
                            <NavLink
                                className="footer-navlink"
                                to=""
                            >
                                <span className="footer-column-link">Liên hệ</span>
                            </NavLink>
                            
                        </div>
                    </div>
                </SectionInner>
            </div>
        )
    }
}

export default Footer