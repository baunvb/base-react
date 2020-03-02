import React from 'react';
import 'views/Booking/completebooking.css'
import 'views/Booking/booking.css';

import WhaleloInput from 'components/CustomInput/WhaleloInput.jsx'
import { vndStyle, requestPrice, checkPickupTimeValid } from 'common/function.jsx';
import itemImage from 'assets/img/wlicon/item_img.png'
import WhaleloAlert from 'components/Alert/WhaleloAlert.jsx'
import WarningAlert from 'components/Alert/WarningAlert.jsx'

import iconAddImg from 'assets/img/wlicon/icon_add_img.png';
import * as requestApi from 'api/requestApi.js';
import { ITEMS, API } from 'config/Constant' //REQUEST_COMFIRM_APPOINTMENT
import ImageViewer from '../../components/ImageViewer/ImageViewer';
import Resizer from 'react-image-file-resizer';

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
      time_pickup: new Date(data.pick_up_time),
      date_pickup: new Date(data.pick_up_time),
      item_count: data.package_total,
      fullname: data.guest_name,
      price: data.price,
      resultBookingAlert: null,
      imagePreviewUrl: [],
      imgFiles: [],

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

  onInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }


  onCancel = () => {
    this.alert.hide();
  }

  onConfirm = () => {
    const { id, time_dropoff, date_dropoff, time_pickup, date_pickup, item_count, fullname, email, imgFiles } = this.state;

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
      deposit: 0,
      images: imgFiles

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

  openImage = (src) => {
    this.imageViewer.update("show", true)
    this.imageViewer.update("src", src)
  }
  onClickAddImage = () => {
    this.selectImage.click();
  }

  handleImageChange = (e) => {
    e.preventDefault();
    let files = e.target.files;
    for (var key in files) {
      if (key !== "length" && key !== "item") {
        let reader = new FileReader();
        Resizer.imageFileResizer(
          files[key],
          500,
          500,
          'JPEG',
          80,
          0,
          uri => {
            console.log("imageFileResizer", uri)
            this.setState((prevState) => ({
              imgFiles: [...prevState.imgFiles, uri]
            }))
          },
          'base64'
        );

        reader.onloadend = () => {
          this.setState((prevState) => ({
            imagePreviewUrl: [...prevState.imagePreviewUrl, reader.result]
          }));
        };
        reader.readAsDataURL(files[key]);
      }
    }

  }

  onSubmit = () => {
    this.alert.show()
  }

  onSetDateTime = (event, inst, name) => {
    const time = inst.getVal();
    this.setState({
      [name]: time
    })
    console.log("date time", time, event.valueText, name)
  }

  render() {
    const { data } = this.props.location
    return (
      <div className="wrap-add-booking">
        <WarningAlert 
          ref={instance => this.warningAlert = instance}
        />
        <ImageViewer
          ref={instance => this.imageViewer = instance}
        />
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
              {
                this.state.imagePreviewUrl.map((item, key) => {
                  return (
                    <img className='item-img' src={item} onClick={e => this.openImage(item)} />
                  )
                })
              }

              <div className="add-img" onClick={e => this.onClickAddImage()}>
                <img className="icon-add" src={iconAddImg} />
                <input className="input-hide" ref={instance => this.selectImage = instance} type="file" accept="image/*" multiple onChange={e => this.handleImageChange(e)}></input>
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