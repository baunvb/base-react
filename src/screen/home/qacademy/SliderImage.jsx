import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import SectionInner from '../../../component/Container/SectionInner'
import "./q-academy-slider.css"

export default class SliderImage extends React.Component {

    render() {
        return (
            <div className="q-academy-slider-main">
                <SectionInner>
                    <Carousel
                        showThumbs={false}
                        autoPlay={true}
                        interval={3000}
                        infiniteLoop={true}
                        showStatus={false}

                    >
                        <div>
                            <img src="https://photo2.tinhte.vn/data/attachment-files/2020/06/5060422_Cover_Microsoft.jpg" />
                            {/* <p className="legend">Legend 1</p> */}
                        </div>
                        <div>
                            <img src="https://photo2.tinhte.vn/data/attachment-files/2020/06/5057551_cover_home_ipados_14_beta.jpg" />
                            {/* <p className="legend">Legend 2</p> */}
                        </div>
                        <div>
                            <img src="https://photo2.tinhte.vn/data/attachment-files/2020/06/5060422_Cover_Microsoft.jpg" />
                            {/* <p className="legend">Legend 3</p> */}
                        </div>
                    </Carousel>
                </SectionInner>
            </div>

        )
    }
}