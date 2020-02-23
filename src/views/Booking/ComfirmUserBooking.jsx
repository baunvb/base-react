import React from 'react';
import 'views/Booking/completebooking.css'
import WhaleloInput from 'components/CustomInput/WhaleloInput.jsx'
import { vndStyle } from 'common/function.jsx';
import itemImage from 'assets/img/wlicon/item_img.png'
import WhaleloAlert from 'components/Alert/WhaleloAlert.jsx'
import iconAddImg from 'assets/img/wlicon/icon_add_img.png';


class ComfirmUserBooking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     
    }

  }

  componentDidMount() {

  }

  handleSelectPaymenthod = (e) => {
    this.setState({
      paymenthod: e.target.value
    })
  }

  onCancel = () => {
    this.alert.hide();
  }

  onConfirm = () => {
    alert("request booking");
    this.alert.hide()
  }

  onSubmit = () => {
    this.alert.show()
  }

  render() {

    return (
      <div className="wrap-add-booking">
        <WhaleloAlert
          ref={instance => this.alert = instance}
          header="Complete booking"
          confirmText="Confirm"
          cancelText="Cancel"
          onCacel={this.onCancel}
          onConfirm={this.onConfirm}
        >
          <span>Are you sure to drop-off?</span>
        </WhaleloAlert>

        <div className="booking-title">
          Confirm appointment
          <span className="serial-order">#{123}</span>
        </div>
        <div className="form-data">
          <div>
            <span className="left-label">Email:</span>
            <span className="right-label">vanbaubv@gmail.com </span>
          </div>
          <hr />

          <WhaleloInput
            name="fullname"
            label="Full name*"
          />
          <hr />

          <div className="wrap-date-time">
            <div className="date-booking" >
              <WhaleloInput
                selectAble={true}
                name="date-dropoff"
                label="Date to drop-off*"
              />
            </div>
            <div className="empty"></div>
            <div className="time-booking">
              <WhaleloInput
                selectAble={true}
                name="time-dropoff"
                label="Time to drop-off*"
              />
            </div>
          </div>

          <hr />

          <div className="wrap-date-time">
            <div className="date-booking" >
              <WhaleloInput
                selectAble={true}
                name="date-pickup"
                label="Estimated date to pick up*"
              />
            </div>
            <div className="empty"></div>
            <div className="time-booking">
              <WhaleloInput
                selectAble={true}
                name="time-pickup"
                label="Estimated time to pick up*"
              />
            </div>
          </div>

          <hr />

          <WhaleloInput
            selectAble={true}
            name="item-count"
            label="Number of charged items*"
          />
          <hr />
          <div>
            <span className="label-estimated">Estimated Price</span>
            <span className="price-esti">{vndStyle(1000000)} đ</span>
          </div>
          <hr />

          <div>
            <div className="list-imgs">
              <img className='item-img' src={itemImage} />
              <img className='item-img' src={itemImage} />
              <img className='item-img' src={itemImage} />
              <img className='item-img' src={itemImage} />
              <img className='item-img' src={itemImage} />
              <img className='item-img' src={itemImage} />
              <img className='item-img' src={itemImage} />
              <img className='item-img' src={itemImage} />
              <img className='item-img' src={itemImage} />
              <img className='item-img' src={itemImage} />
              <div className="add-img">
                <img className="icon-add"  src={iconAddImg} />
              </div>
              
            </div>
           
          </div>
          <hr />

          <button className="btn-login" onClick={() => this.onSubmit()}>
            Drop-off
          </button>

        </div>
      </div>
    )
  }

}

export default ComfirmUserBooking