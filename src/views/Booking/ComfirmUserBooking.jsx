import React from 'react';
import 'views/Booking/completebooking.css'

import WhaleloInput from 'components/CustomInput/WhaleloInput.jsx'
import { vndStyle, requestPrice } from 'common/function.jsx';
import itemImage from 'assets/img/wlicon/item_img.png'
import WhaleloAlert from 'components/Alert/WhaleloAlert.jsx'
import iconAddImg from 'assets/img/wlicon/icon_add_img.png';
import * as requestApi from 'api/requestApi.js';
import { ITEMS, API } from 'config/Constant' //REQUEST_COMFIRM_APPOINTMENT
import { connect } from "react-redux";
import { STORAGE_ACTION } from 'actions/StorageActions.js'

class ComfirmUserBooking extends React.Component {
  constructor(props) {
    super(props);
    const { data } = this.props.location
    if (data === undefined) {
      window.location.href = '/home'
    }
    console.log("Data", data)
    this.state = {
      id: data.id,
      serial: data.serial,
      email: data.email,
      time_dropoff: new Date(data.drop_off_time),
      date_dropoff: new Date(data.drop_off_time),
      time_pickup: new Date(data.drop_off_time),
      date_pickup: new Date(data.drop_off_time),
      item_count: data.package_total,
      fullname: data.guest_name,
      price: data.price,

      resultBookingAlert: null

    }

  }

  componentDidMount() {

  }

  async componentDidUpdate(prevProps, prevState) {
    const { date_dropoff, time_dropoff, date_pickup, time_pickup, item_count } = this.state;

    if (prevState.item_count !== item_count || prevState.date_dropoff !== date_dropoff || prevState.time_dropoff !== time_dropoff ||
      prevState.date_pickup !== date_pickup || prevState.time_pickup !== time_pickup) {

      const DateDropoff = new Date(date_dropoff);
      const TimeDropoff = new Date(time_dropoff);
      const DatePickup = new Date(date_pickup);
      const TimePickup = new Date(time_pickup);

      const dataPrice = {
        drop_off_time: `${DateDropoff.getMonth() + 1}/${DateDropoff.getDate()}/${DateDropoff.getFullYear()} ${TimeDropoff.getHours()}:${TimeDropoff.getMinutes()}`,
        package_total: parseInt(item_count),
        pick_up_time: `${DatePickup.getMonth() + 1}/${DatePickup.getDate()}/${DatePickup.getFullYear()} ${TimePickup.getHours()}:${TimePickup.getMinutes()}`,
      }

      var price = await requestPrice(dataPrice);
      this.setState({
        price: price
      })
    }

  }

  onInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }


  onCancel = () => {
    this.alert.hide();
  }

  onConfirm = () => {
    const { id, time_dropoff, date_dropoff, time_pickup, date_pickup, item_count, fullname, email } = this.state;

    const DateDropoff = new Date(date_dropoff);
    const TimeDropoff = new Date(time_dropoff);
    const DatePickup = new Date(date_pickup);
    const TimePickup = new Date(time_pickup);

    const dataConfirm = {
      drop_off_time: `${DateDropoff.getMonth() + 1}/${DateDropoff.getDate()}/${DateDropoff.getFullYear()} ${TimeDropoff.getHours()}:${TimeDropoff.getMinutes()}`,
      email: email,
      guest_name: fullname,
      package_total: parseInt(item_count),
      id: id,
      pick_up_time: `${DatePickup.getMonth() + 1}/${DatePickup.getDate()}/${DatePickup.getFullYear()} ${TimePickup.getHours()}:${TimePickup.getMinutes()}`,
      deposit: 0
    }
    requestApi.postByToken(API.REQUEST_COMFIRM_APPOINTMENT, dataConfirm, (res) => {
      console.log("Res", res);
      if (res.code === 200) {
        this.alertConfirmSuccess.show();
      } else {
        this.alertConfirmFalse.show();
      }
    })
  }

  onSubmit = () => {
    this.alert.show()
  }

  onSetDateTime = (event, inst, name) => {
    const time = inst.getVal();
    this.setState({
      [name]: event.valueText
    })
    console.log("date time", time, event.valueText, name)
  }

  render() {
    const { data } = this.props.location
    return (
      <div className="wrap-add-booking">
        <WhaleloAlert
          ref={instance => this.alertConfirmSuccess = instance}
          header="Confirm booking"
          showCancel={false}
          confirmText="OK"
          onConfirm={() => { this.props.history.go(-1) }}
        >
          <span>Your booking was confirmed successfully!</span>
        </WhaleloAlert>

        <WhaleloAlert
          ref={instance => this.alertConfirmFalse = instance}
          header="Confirm booking"
          showCancel={false}
          confirmText="OK"
          onConfirm={() => { return }}
        >
          <span>Occured error when confirm this booking. Please try again!</span>
        </WhaleloAlert>
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
          <span className="serial-order">#{data.serial}</span>
        </div>
        <div className="form-data">
          <div>
            <span className="left-label">Email:</span>
            <span className="right-label">{data.email}</span>
          </div>
          <hr />

          <WhaleloInput
            name="fullname"
            value={this.state.fullname}
            onChange={this.onInput}
            label="Full name*"
          />
          <hr />

          <div className="wrap-date-time">
            <div className="date-booking" >
              <WhaleloInput
                selectAble={true}
                value={this.state.date_dropoff}
                type="date"
                name="date_dropoff"
                label="Date to drop-off*"
                onSet={this.onSetDateTime}

              />
            </div>
            <div className="empty"></div>
            <div className="time-booking">
              <WhaleloInput
                selectAble={true}
                value={this.state.time_dropoff}
                type="time"
                name="time_dropoff"
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
                value={this.state.date_pickup}
                type="date"
                name="date_pickup"
                label="Estimated date to pick up*"
                onSet={this.onSetDateTime}

              />
            </div>
            <div className="empty"></div>
            <div className="time-booking">
              <WhaleloInput
                selectAble={true}
                value={this.state.time_pickup}
                type="time"
                name="time_pickup"
                label="Estimated time to pick up*"
                onSet={this.onSetDateTime}

              />
            </div>
          </div>

          <hr />

          <WhaleloInput
            value={this.state.item_count}
            selectAble={true}
            type="select"
            items={ITEMS}
            name="item_count"
            label="Number of charged items*"
            onSet={this.onSetDateTime}

          />
          <hr />
          <div>
            <span className="label-estimated">Estimated Price</span>
            <span className="price-esti">{vndStyle(this.state.price)} đ</span>
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
                <img className="icon-add" src={iconAddImg} />
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