import React from 'react';
import 'views/Booking/completebooking.css'
import 'views/Booking/booking.css'

import WhaleloInput from 'components/CustomInput/WhaleloInput.jsx'
import itemImage from 'assets/img/wlicon/item_img.png'
import iconPayment from 'assets/img/wlicon/icon_money.png'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import WhaleloAlert from 'components/Alert/WhaleloAlert.jsx'
import WarningAlert from 'components/Alert/WarningAlert.jsx'

import { vndStyle, normalizeDateTime, requestPrice, checkPickupTimeValid } from 'common/function.jsx';
import * as requestApi from 'api/requestApi';
import { API } from 'config/Constant';
import { BASE_URL_IMG } from 'config/host.js';
import ImageViewer from '../../components/ImageViewer/ImageViewer';

const PAYMENT_METHOD = [
  { value: "cash", label: "Pay by cash" },
  { value: "online", label: "Pay Online" },
  { value: "debt", label: "Debt" }

]

class CompleteBooking extends React.Component {
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
      time_pickup: new Date(data.pick_up_time),
      date_pickup: new Date(data.pick_up_time),
      item_count: data.package_total,
      fullname: data.guest_name,
      imagePreviewUrl: data.images !== undefined ? data.images : [],
      price: data.price,
      paymenthod: PAYMENT_METHOD[0].value,
      resultBookingAlert: null

    }
  }

  componentDidMount() {

  }

  async componentDidUpdate(prevProps, prevState) {
    const { date_dropoff, time_dropoff, date_pickup, time_pickup, item_count } = this.state;

    if (prevState.date_pickup !== date_pickup || prevState.time_pickup !== time_pickup) {
      const DateDropoff = new Date(date_dropoff);
      const TimeDropoff = new Date(time_dropoff);
      const DatePickup = new Date(date_pickup);
      const TimePickup = new Date(time_pickup);

      const drop_off_time = `${DateDropoff.getMonth() + 1}/${DateDropoff.getDate()}/${DateDropoff.getFullYear()} ${TimeDropoff.getHours()}:${TimeDropoff.getMinutes()}`;
      const pick_up_time = `${DatePickup.getMonth() + 1}/${DatePickup.getDate()}/${DatePickup.getFullYear()} ${TimePickup.getHours()}:${TimePickup.getMinutes()}`;
      const isValidTimeRange = checkPickupTimeValid(date_dropoff, time_dropoff, date_pickup, time_pickup)
      if (!isValidTimeRange) {
        this.warningAlert.updateState("content", <span>From Pick-up time to Drop-off time is the least about 1 hour</span>);
        this.warningAlert.show();
        return;
      }
      const dataPrice = {
        "drop_off_time": drop_off_time,
        "package_total": parseInt(item_count),
        "pick_up_time": pick_up_time,
      }

      var price = await requestPrice(dataPrice);
      this.setState({
        price: price
      })
    }

  }

  onSetDateTime = (event, inst, name) => {
    const time = inst.getVal();
    this.setState({
      [name]: time
    })
    console.log("date time", time, event.valueText, name)
  }

  handleSelectPaymenthod = (e) => {
    this.setState({
      paymenthod: e.target.value
    })
  }

  onCancel = () => {
    this.alert.hide();
    this.alertPayment.hide();
  }

  onAfterComplete = () => {
    this.props.history.push('/home')
  }

  onConfirm = () => {
    const { id, date_pickup, time_pickup } = this.state;
    const DatePickup = new Date(date_pickup);
    const TimePickup = new Date(time_pickup);

    const dataComplete = {
      "id": id,
      "pick_up_time": `${DatePickup.getMonth() + 1}/${DatePickup.getDate()}/${DatePickup.getFullYear()} ${TimePickup.getHours()}:${TimePickup.getMinutes()}`,
    }

    console.log("dataBooking", dataComplete)

    requestApi.postByToken(API.REQUEST_COMPLETE, dataComplete, (res) => {
      console.log("Request complete booking", res)
      if (res.code === 200) {
        this.alertCompleteSuccess.show();
      } else {
        this.alertCompleteFalse.show();
      }
    })

    this.alert.hide()
  }

  onConfirmPaymenthod = () => {
    this.alertPayment.hide();
  }

  onSubmit = () => {
    this.alert.show()
  }

  openImage = (src) => {
    this.imageViewer.update("show", true)
    this.imageViewer.update("src", src)
  }

  render() {
    const { paymenthod } = this.state;
    const textPaymenthod = PAYMENT_METHOD[PAYMENT_METHOD.findIndex(s => s.value == paymenthod)].label
    const DateTime = normalizeDateTime(this.state.time_dropoff);

    return (
      <div className="wrap-add-booking">
        <WarningAlert
          ref={instance => this.warningAlert = instance}
        />
        <ImageViewer
          ref={instance => this.imageViewer = instance}
        />
        <WhaleloAlert
          ref={instance => this.alertCompleteSuccess = instance}
          header="Complete booking"
          showCancel={false}
          confirmText="OK"
          onConfirm={() => { this.props.history.go(-1) }}
        >
          <span>Your booking was completed successfully!</span>
        </WhaleloAlert>

        <WhaleloAlert
          ref={instance => this.alertCompleteFalse = instance}
          header="Complete booking"
          showCancel={false}
          confirmText="OK"
          onConfirm={() => { return }}
        >
          <span>Occured error when complete this booking</span>
        </WhaleloAlert>

        <WhaleloAlert
          ref={instance => this.alert = instance}
          header="Complete booking"
          confirmText="Confirm"
          cancelText="Cancel"
          onCacel={this.onCancel}
          onConfirm={this.onConfirm}
        >
          <span>Are you sure to complete booking?</span>
        </WhaleloAlert>

        <WhaleloAlert
          ref={instance => this.alertPayment = instance}
          header="Payment method"
          confirmText="Accept"
          showCancel={false}
          // cancelText="Cancel"
          // onCacel={this.onCancel}
          onConfirm={this.onConfirmPaymenthod}
        >
          <FormControl fullWidth component="fieldset">
            {/* RadioGroup value require string */}
            <RadioGroup value={this.state.paymenthod} onChange={e => this.handleSelectPaymenthod(e)}>
              {
                PAYMENT_METHOD.map((prop, key) => {
                  return (

                    <FormControlLabel
                      classes={{ label: "radio-btn-pay-label", root: "form-ctr-root " }}
                      value={prop.value}
                      control={<Radio color="secondary" classes={{ checked: "radio-btn-pay" }} />}
                      label={prop.label}
                      labelPlacement="start"
                    />
                  )
                })
              }

            </RadioGroup>
          </FormControl>
        </WhaleloAlert>

        <div className="booking-title">
          Complete booking
          <span className="serial-order">#{this.state.serial}</span>
        </div>
        <div className="form-data">
          <div>
            <span className="left-label">Email:</span>
            <span className="right-label">{this.state.email}</span>
          </div>
          <hr />

          <div>
            <span className="left-label">Full name:</span>
            <span className="right-label">{this.state.fullname}</span>
          </div>
          <hr />

          <div>
            <span className="left-label">Drop-off:</span>
            <span className="right-label">{`${DateTime.time} - ${DateTime.date}`}</span>
          </div>
          <hr />

          <div>
            <span className="left-label">Number of charged items:</span>
            <span className="right-label">{this.state.item_count}</span>
          </div>
          <hr />

          <div className="wrap-date-time">
            <div className="date-booking" >
              <WhaleloInput
                value={this.state.date_pickup}
                selectAble={true}
                type="date"
                name="date_pickup"
                label="Date to pick up*"
                onSet={this.onSetDateTime}

              />
            </div>
            <div className="empty"></div>
            <div className="time-booking">
              <WhaleloInput
                value={this.state.time_pickup}
                selectAble={true}
                type="time"
                name="time_pickup"
                label="Time to pick up*"
                onSet={this.onSetDateTime}

              />
            </div>
          </div>
          <hr />

          <div>
            <span className="left-label">Total Amount:</span>
            <span className="right-label">{vndStyle(this.state.price)} đ</span>
          </div>
          <hr />

          <div>
            <span className="left-label">Luggage Photos:({this.state.imagePreviewUrl.length})</span>
            <div className="list-imgs">
              {
                this.state.imagePreviewUrl.map((item, key) => {
                  return (
                    <img className='item-img' src={BASE_URL_IMG + item} onClick={e => this.openImage(BASE_URL_IMG + item)} />
                  )
                })
              }
            </div>
          </div>
          <hr />
          <div className="pay-row"
            onClick={(e) => this.alertPayment.show()}
          >
            <span className="left-label">Payment method</span>
            <div className="wrap-payment">
              <img className="icon-pay" src={iconPayment} />
              <span>{textPaymenthod}</span>
            </div>
          </div>
          <hr />

          <button className="btn-login" onClick={() => this.onSubmit()}>
            Complete booking
          </button>

        </div>
      </div>
    )
  }

}

export default CompleteBooking