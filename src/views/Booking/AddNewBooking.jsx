import React from 'react';
import 'views/Booking/booking.css'
import WhaleloInput from 'components/CustomInput/WhaleloInput.jsx'
import { vndStyle } from 'common/function.jsx';
import iconAddImg from 'assets/img/wlicon/icon_add_img.png';
import itemImage from 'assets/img/wlicon/item_img.png'
import WhaleloAlert from 'components/Alert/WhaleloAlert.jsx'
import mobiscroll from '@mobiscroll/react';
mobiscroll.settings = {
  theme: 'ios' /* set global theme */
}


class AddNewBooking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }

  }

  componentDidMount() {

  }

  onCancel = () => {
    this.alert.hide()
  }

  onInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSetDateTime = (event, inst, name) => {
    const time = inst.getVal();
    console.log("date time", time, event.valueText, name)
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
          header="Create new appoinment"
          confirmText="Confirm"
          cancelText="Cancel"
          onCacel={this.onCancel}
          onConfirm={this.onConfirm}
        >
          <span>Are you sure to create new appointment?</span>
        </WhaleloAlert>

        <div className="booking-title">
          Create new appoinment
        </div>
        <div className="form-data">
          <WhaleloInput
            name="email"
            label="Email*"
            onChange={this.onInput}
          />
          <hr />
          <WhaleloInput
            name="fullname"
            label="Full name*"
            onChange={this.onInput}
          />
          <hr />

          <div className="wrap-date-time">
            <div className="date-booking" >
              <WhaleloInput
                selectAble={true}
                type="date"
                name="date-dropoff"
                label="Date to drop-off*"
                onSet={this.onSetDateTime}
              />

            </div>
            <div className="empty"></div>
            <div className="time-booking">
              <WhaleloInput
                selectAble={true}
                type="time"
                name="time-dropoff"
                label="Time to drop-off*"
                onSet={this.onSetDateTime}

              />
            </div>
          </div>

          <hr />

          <div className="wrap-date-time">
            <div className="date-booking" >
              <WhaleloInput
                selectAble={true}
                type="date"
                name="date-pickup"
                label="Estimated date to pick up*"
                onSet={this.onSetDateTime}

              />
            </div>
            <div className="empty"></div>
            <div className="time-booking">
              <WhaleloInput
                selectAble={true}
                type="time"
                name="time-pickup"
                label="Estimated time to pick up*"
                onSet={this.onSetDateTime}

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
            Set an appointment
          </button>

        </div>
      </div>
    )
  }

}

export default AddNewBooking