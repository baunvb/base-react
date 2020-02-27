import React from 'react';
import 'views/Booking/booking.css'
import WhaleloInput from 'components/CustomInput/WhaleloInput.jsx'
import { vndStyle } from 'common/function.jsx';
import iconAddImg from 'assets/img/wlicon/icon_add_img.png';
import itemImage from 'assets/img/wlicon/item_img.png'
import WhaleloAlert from 'components/Alert/WhaleloAlert.jsx'
import mobiscroll from '@mobiscroll/react';
import { ITEMS, API } from 'config/Constant';
import { validateEmail, requestPrice } from "common/function.jsx";
import * as requestApi from 'api/requestApi';
mobiscroll.settings = {
  theme: 'ios' /* set global theme */
}

const date = new Date();
const esDate = new Date(date.getTime() + 1 * 60 * 60 * 1000)

class AddNewBooking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "time_dropoff": date,
      "date_dropoff": date,
      "time_pickup": esDate,
      "date_pickup": esDate,
      "item_count": 0,
      "email": "",
      "fullname": "",
      "price": 0,
      imagePreviewUrl: [],
      imgFiles: [],

    }

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
        "drop_off_time": `${DateDropoff.getMonth() + 1}/${DateDropoff.getDate()}/${DateDropoff.getFullYear()} ${TimeDropoff.getHours()}:${TimeDropoff.getMinutes()}`,
        "package_total": parseInt(item_count),
        "pick_up_time": `${DatePickup.getMonth() + 1}/${DatePickup.getDate()}/${DatePickup.getFullYear()} ${TimePickup.getHours()}:${TimePickup.getMinutes()}`,
      }

      var price = await requestPrice(dataPrice);
      this.setState({
        price: price
      })
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
    });
    if (e.target.name === "email") {
      var isEmailValid = validateEmail(e.target.value);
      if (isEmailValid) {
        this.inputEmail.hideInvalid();
      }
    }
  }

  onSetDateTime = (event, inst, name) => {
    const time = inst.getVal();
    this.setState({
      [name]: time
    })
    console.log("date time", time, event.valueText, name)
  }

  onConfirm = () => {
    console.log("Data", this.state)
    const { date_dropoff, time_dropoff, date_pickup, time_pickup, email, fullname, item_count } = this.state;
    const DateDropoff = new Date(date_dropoff);
    const TimeDropoff = new Date(time_dropoff);
    const DatePickup = new Date(date_pickup);
    const TimePickup = new Date(time_pickup);

    var formData = new FormData();

    const dataBooking = {
      "drop_off_time": `${DateDropoff.getMonth() + 1}/${DateDropoff.getDate()}/${DateDropoff.getFullYear()} ${TimeDropoff.getHours()}:${TimeDropoff.getMinutes()}`,
      "email": email,
      "guest_name": fullname,
      "package_total": item_count,
      "pick_up_time": `${DatePickup.getMonth() + 1}/${DatePickup.getDate()}/${DatePickup.getFullYear()} ${TimePickup.getHours()}:${TimePickup.getMinutes()}`,
    }

    for (var key in dataBooking) {
      formData.append(key, dataBooking[key]);
    }


    console.log("dataBooking", dataBooking)

    requestApi.postByToken(API.NEW_BOOK, formData, (res) => {
      console.log("Request booking", res)
      if (res.code === 200) {
        this.alertBookingSuccess.show()
      } else {
        this.alertBookingFalse.show()
      }
    })


    this.alert.hide()
  }

  onSubmit = () => {
    const { email } = this.state;
    var isEmailValid = validateEmail(email);
    if (!isEmailValid) {
      this.inputEmail.showInvalid("Email is invalid");
      return
    }
    this.alert.show()
  }

  onClickAddImage = () => {
    var input = document.createElement("input");
    input.multiple = true;
    input.type = "file";
    input.id = this.props.id;
    input.onchange = this.handleImageChange;
    input.click();
  }

  handleImageChange = (e) => {
    e.preventDefault();
    let files = e.target.files;
    console.log("ARR image", files, files.FileList);
    this.setState({
      imgFiles: files
    }, () => console.log("XXX", this.state.imgFiles))

    for (var key in files) {
      console.log("XXXXX", key)
      if (key !== "length" && key !== "item") {
        let reader = new FileReader();
        reader.onloadend = () => {
          this.setState((prevState) => ({
            imagePreviewUrl: [...prevState.imagePreviewUrl, reader.result]
          }));
        };
        reader.readAsDataURL(files[key]);
      }
    }



  }

  render() {

    return (
      <div className="wrap-add-booking">

        <WhaleloAlert
          ref={instance => this.alertBookingSuccess = instance}
          header="New booking"
          confirmText="OK"
          showCancel={false}
          onConfirm={() => this.props.history.go(-1)}
        >
          <span>You have create new booking successfully!</span>
        </WhaleloAlert>
        <WhaleloAlert
          ref={instance => this.alertBookingFalse = instance}
          header="New booking"
          confirmText="OK"
          showCancel={false}
          onConfirm={() => { return }}
        >
          <span>Occurs an error when create new booking. Please try again!</span>
        </WhaleloAlert>

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
            ref={instance => this.inputEmail = instance}
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
                value={this.state.date_dropoff}
                selectAble={true}
                type="date"
                name="date_dropoff"
                label="Date to drop-off*"
                onSet={this.onSetDateTime}
              />

            </div>
            <div className="empty"></div>
            <div className="time-booking">
              <WhaleloInput
                value={this.state.time_dropoff}
                selectAble={true}
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
                value={this.state.date_pickup}
                selectAble={true}
                type="date"
                name="date_pickup"
                label="Estimated date to pick up*"
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
                label="Estimated time to pick up*"
                onSet={this.onSetDateTime}

              />
            </div>
          </div>

          <hr />

          <WhaleloInput
            selectAble={true}
            value={this.state.item_count}
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
                  <img className='item-img' src={item} />
                )
              })
            }
              <div className="add-img" onClick={e => this.onClickAddImage()}>
                <img className="icon-add" src={iconAddImg} />
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