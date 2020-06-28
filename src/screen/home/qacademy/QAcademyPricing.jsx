import React from 'react'
import './q-academy-pricing.css'
import SectionInner from '../../../component/Container/SectionInner'
import { SunQPricingData } from '../../../assets/data/SunQPricing'

export default class QAcademyPricing extends React.Component {
    render() {
        return (
            <div className="q-academy-pricing-main">
                <SectionInner>
                    <div className="q-academy-pricing-wrap-info">
                        <div className="q-academy-pricing-wrap-info-column">
                            <span className="q-academy-pricing-info-title">Giờ mở cửa</span>
                            <span className="q-academy-pricing-info-detail">Từ 8h sáng đến 21h tối</span>
                            <hr />
                            <span className="q-academy-pricing-info-title">Chúng tôi ở</span>
                            <span className="q-academy-pricing-info-detail">57 Huỳnh Thúc Kháng <br />
                            Tòa nhà Sunshine Rivershine (tầng 3) đường Võ Chí Công, Quận Tây Hồ, Hà Nội</span>
                            <hr />
                        </div>
                        <div className="q-academy-pricing-wrap-info-column">
                            <span className="q-academy-pricing-info-title">Giá vé</span>
                            <div className="q-academy-pricing-item-price">
                                <span className="q-academy-pricing-info-detail q-academy-pricing-left">Học sinh từ > 4 tuổi</span>
                                <span className="q-academy-pricing-info-detail q-academy-pricing-right">200.000/buổi</span>
                            </div>
                            <hr />

                            <div className="q-academy-pricing-item-price">
                                <span className="q-academy-pricing-info-detail q-academy-pricing-left">Người lớn</span>
                                <span className="q-academy-pricing-info-detail q-academy-pricing-right">150.000/buổi</span>
                            </div>
                            <hr />

                            <div className="q-academy-pricing-item-price">
                                <span className="q-academy-pricing-info-detail q-academy-pricing-left">Gia đình</span>
                                <span className="q-academy-pricing-info-detail q-academy-pricing-right">200.000/buổi</span>
                            </div>
                            <hr />

                            <div className="q-academy-pricing-item-price">
                                <span className="q-academy-pricing-info-detail q-academy-pricing-left">Thành viên</span>
                                <span className="q-academy-pricing-info-detail q-academy-pricing-right">Free</span>
                            </div>
                            <hr />

                        </div>
                        <div className="q-academy-pricing-break-line">
                            <span className="q-academy-pricing-info-title">Liên lạc</span>
                            <span className="q-academy-pricing-info-detail">039 455 5457</span> <br/>
                            <span className="q-academy-pricing-info-detail">fb.com/SunQ</span>
                        </div>
                    </div>
                    <div className="q-academy-pricing-grid-item">
                        {
                            SunQPricingData.map((pricing, key) => {
                                return (
                                    <div className="q-academy-pricing-item">
                                        <img className="q-academy-pricing-item-image" src={pricing.featured_image} />
                                        <div className="q-academy-pricing-item-content">
                                            <span className="q-academy-pricing-item-title">{pricing.title}</span>
                                            <span className="q-academy-pricing-item-excerpt" dangerouslySetInnerHTML={{ __html: pricing.content }}></span>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>
                </SectionInner>
            </div >
        )
    }
}