import React from 'react';
import 'views/Booking/booking.css';
import WhaleloInput from 'components/CustomInput/WhaleloInput.jsx';
import { vndStyle, normalizeFormDataRequestPrice, validateEmail, requestPrice, checkPickupTimeValid } from 'common/function.jsx';
import iconAddImg from 'assets/img/wlicon/icon_add_img.svg';
import InfoIcon from 'assets/img/wlicon/icon_info.svg';
import WhaleloAlert from 'components/Alert/WhaleloAlert.jsx'
import CommonAlert from 'components/Alert/CommonAlert.jsx'
import mobiscroll from '@mobiscroll/react';
import { ITEMS, API } from 'config/Constant';
import * as requestApi from 'api/requestApi';
import Resizer from 'react-image-file-resizer';
import ImageViewer from '../../components/ImageViewer/ImageViewer';
import Pricing from "views/Booking/Pricing.jsx";
import Circle from 'components/Progress/Circle'
import { connect } from "react-redux"
import CircleDataLoading from '../../components/Progress/CircleDataLoading.jsx'
import { STORAGE_ACTION } from '../../actions/StorageActions'
mobiscroll.settings = {
  theme: 'ios' /* set global theme */
}

const date = new Date();
const esDate = new Date(date.getTime() + 1 * 60 * 60 * 1000)

class AddNewBooking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time_dropoff: date,
      date_dropoff: date,
      time_pickup: esDate,
      date_pickup: esDate,
      item_count: ITEMS[0].value,
      email: "",
      fullname: "",
      price: 0,
      imagePreviewUrl: [],
      imgFiles: [],
    }

  }

  async componentDidUpdate(prevProps, prevState) {
    const { date_dropoff, time_dropoff, date_pickup, time_pickup, item_count } = this.state;

    if (prevState.item_count !== item_count || prevState.date_dropoff !== date_dropoff || prevState.time_dropoff !== time_dropoff ||
      prevState.date_pickup !== date_pickup || prevState.time_pickup !== time_pickup) {
      let formDataRequestPrice = normalizeFormDataRequestPrice(date_dropoff, time_dropoff, date_pickup, time_pickup, item_count);
      const isValidTimeRange = checkPickupTimeValid(date_dropoff, time_dropoff, date_pickup, time_pickup)
      if (!isValidTimeRange) {
        this.CommonAlert.updateState("content", <span>From Pick-up time to Drop-off time is the least about 1 hour</span>);
        this.CommonAlert.show('warning');
        return;
      }
      this.loadingPrice.updateState('loading', true);
      var price = await requestPrice(formDataRequestPrice);
      this.setState({
        price: price
      }, () => this.loadingPrice.updateState('loading', false))
    }

  }

  async componentDidMount() {
    const { date_dropoff, time_dropoff, date_pickup, time_pickup, item_count } = this.state;
    let formDataRequestPrice = normalizeFormDataRequestPrice(date_dropoff, time_dropoff, date_pickup, time_pickup, item_count);
    this.loadingPrice.updateState('loading', true);

    var price = await requestPrice(formDataRequestPrice);
    this.setState({
      price: price
    }, () => this.loadingPrice.updateState('loading', false))
  }

  onOpenPricing = () => {
    this.pricing.update("show", true);
  }

  onCancel = () => {
    this.alert.hide()
  }

  onInput = (e) => {
    let { name, value } = e.target
    this.setState({
      [name]: value
    });
    if (name === "email") {
      var isEmailValid = validateEmail(value);
      if (isEmailValid) this.inputEmail.hideInvalid();
    }

    if (name === "fullname") {
      if (value.length > 0) this.inputFullName.hideInvalid()
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
    this.alert.hide()
    this.loadding.show()
    const { date_dropoff, time_dropoff, date_pickup, time_pickup, email, fullname, item_count, imgFiles } = this.state;
    const DateDropoff = new Date(date_dropoff);
    const TimeDropoff = new Date(time_dropoff);
    const DatePickup = new Date(date_pickup);
    const TimePickup = new Date(time_pickup);

    const dataBooking = {
      "drop_off_time": `${DateDropoff.getMonth() + 1}/${DateDropoff.getDate()}/${DateDropoff.getFullYear()} ${TimeDropoff.getHours()}:${TimeDropoff.getMinutes()}`,
      "email": email,
      "guest_name": fullname,
      "package_total": item_count,
      "pick_up_time": `${DatePickup.getMonth() + 1}/${DatePickup.getDate()}/${DatePickup.getFullYear()} ${TimePickup.getHours()}:${TimePickup.getMinutes()}`,
      "images": imgFiles
    }

    console.log("dataBooking", dataBooking)

    requestApi.postByToken(API.NEW_BOOK, dataBooking, (res) => {
      this.loadding.hide()
      console.log("Request booking", res)
      if (res.code === 200) {
        this.CommonAlert.updateState("content", <span>You have create new booking successfully!</span>);
        this.CommonAlert.show('success');
        setTimeout(() => {
          this.props.history.go(-1);
          this.props.updateState(STORAGE_ACTION.STORAGE_TAB, 1)
        }, 1000);

      } else {
        this.CommonAlert.updateState("content", <span>Occurs an error when create new booking. Please try again!</span>);
        this.CommonAlert.show('warning');
      }
    })

  }

  openImage = (src) => {
    this.imageViewer.update("show", true)
    this.imageViewer.update("src", src)
  }

  onSubmit = () => {
    const { email, fullname, date_dropoff, time_dropoff, date_pickup, time_pickup } = this.state;
    var isEmailValid = validateEmail(email);
    let isValid = true;
    if (!isEmailValid) {
      this.inputEmail.showInvalid("Email is invalid");
      isValid = false;
    }
    if (fullname === "") {
      this.inputFullName.showInvalid("Please fill full name");
      isValid = false;
    }

    const isValidTimeRange = checkPickupTimeValid(date_dropoff, time_dropoff, date_pickup, time_pickup)
    if (!isValidTimeRange) {
      this.CommonAlert.updateState("content", <span>From Pick-up time to Drop-off time is the least about 1 hour</span>);
      this.CommonAlert.show('warning');
      isValid = false;
    }

    if (isValid) this.alert.show()

  }

  onClickAddImage = () => {
    // var input = document.createElement("input");
    // input.multiple = true;
    // input.type = "file";
    // input.id = "idxx";
    // input.accept = "image/*";
    // input.onchange = this.handleImageChange;

    this.selectImage.click();
  }

  handleImageChange = (e) => {
    e.preventDefault();
    let files = e.target.files;
    for (var key in files) {
      console.log("XXXXX", key)
      if (key !== "length" && key !== "item") {
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
        <Pricing
          ref={instance => this.pricing = instance}
        />
        <Circle ref={ref => this.loadding = ref} />

        <CommonAlert
          ref={instance => this.CommonAlert = instance}
        />
        <ImageViewer
          ref={instance => this.imageViewer = instance}
        />

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
            ref={instance => this.inputFullName = instance}
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
            icon={InfoIcon}
            onIconClick={e => this.onOpenPricing()}
            onSet={this.onSetDateTime}

          />
          <hr />
          <div>
            <span className="label-estimated">Estimated Price</span>
            <CircleDataLoading
              ref={ref => this.loadingPrice = ref}
              content = {<span className="price-esti">{vndStyle(this.state.price)} đ</span>} 
            />
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
            Set an appointment
          </button>

        </div>
      </div>
    )
  }

}

const mapDispatchToProps = dispatch => {
  return {
    updateState: (type, data) => dispatch({ type, data })
  }
}

export default connect(null, mapDispatchToProps, null, { forwardRef: true })(AddNewBooking)