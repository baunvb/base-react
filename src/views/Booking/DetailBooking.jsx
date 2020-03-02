import React from 'react';
import 'views/Booking/completebooking.css'
import { vndStyle, normalizeDateTime, requestPrice } from 'common/function.jsx';
import itemImage from 'assets/img/wlicon/item_img.png'
import { BASE_URL_IMG } from 'config/host.js';
import ImageViewer from '../../components/ImageViewer/ImageViewer';
class DetailBooking extends React.Component {
  constructor(props) {
    super(props);
    const { data } = this.props.location
    if (data === undefined) {
      window.location.href = '/home'
    }
  }

  componentDidMount() {

  }

  openImage = (src) => {
    this.imageViewer.update("show", true)
    this.imageViewer.update("src", src)
  }

  render() {
    const { data } = this.props.location
    const DateTimeDropOff = normalizeDateTime(data.drop_off_time);
    const DateTimePickup = normalizeDateTime(data.pick_up_time);

    return (
      <div className="wrap-add-booking">
        <ImageViewer
          ref={instance => this.imageViewer = instance}
        />
        <div className="booking-title">
          Booking Details
          <span className="serial-order">#{data.serial}</span>
        </div>
        <div className="form-data">
          <div>
            <span className="left-label">Email:</span>
            <span className="right-label">{data.email}</span>
          </div>
          <hr />

          <div>
            <span className="left-label">Full name:</span>
            <span className="right-label">{data.guest_name}</span>
          </div>
          <hr />

          <div>
            <span className="left-label">Drop-off:</span>
            <span className="right-label">{`${DateTimeDropOff.time} - ${DateTimeDropOff.date}`}</span>
          </div>
          <hr />

          <div>
            <span className="left-label">Number of charged items:</span>
            <span className="right-label">{data.package_total}</span>
          </div>
          <hr />

          <div>
            <span className="left-label">Pick-up:</span>
            <span className="right-label">{`${DateTimePickup.time} - ${DateTimePickup.date}`}</span>
          </div>

          <hr />

          <div>
            <span className="left-label">Total Amount:</span>
            <span className="right-label">{vndStyle(data.price)} đ</span>
          </div>
          <hr />

          <div>
    <span className="left-label">Luggage Photos:({data.images !== undefined ? data.images.length : 0})</span>
            <div className="list-imgs">
              {
               data.images !== undefined && data.images.map((item, key) => {
                  return (
                    <img className='item-img' src={BASE_URL_IMG + item} onClick={e => this.openImage(BASE_URL_IMG + item)} />
                  )
                })
              }
            </div>
          </div>
          <hr />
        </div>
      </div>
    )
  }

}

export default DetailBooking