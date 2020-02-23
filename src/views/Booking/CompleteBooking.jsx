import React from 'react';
import 'views/Booking/completebooking.css'
import WhaleloInput from 'components/CustomInput/WhaleloInput.jsx'
import { vndStyle } from 'common/function.jsx';
import itemImage from 'assets/img/wlicon/item_img.png'
import iconPayment from 'assets/img/wlicon/icon_money.png'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import WhaleloAlert from 'components/Alert/WhaleloAlert.jsx'

const PAYMENT_METHOD = [
  { value: "cash", label: "Pay by cash" },
  { value: "online", label: "Pay Online" },
  { value: "debt", label: "Debt" }

]

class CompleteBooking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paymenthod: PAYMENT_METHOD[0].value
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
    this.alertPayment.hide();
  }

  onConfirm = () => {
    alert("request booking");
    this.alert.hide()
  }

  onConfirmPaymenthod = () => {
    this.alertPayment.hide();
  }

  onSubmit = () => {
    this.alert.show()
  }

  render() {

    const {paymenthod} = this.state;
    const textPaymenthod = PAYMENT_METHOD[PAYMENT_METHOD.findIndex( s => s.value == paymenthod )].label

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
          <span className="serial-order">#{123}</span>
        </div>
        <div className="form-data">
          <div>
            <span className="left-label">Email:</span>
            <span className="right-label">vanbaubv@gmail.com </span>
          </div>
          <hr />

          <div>
            <span className="left-label">Full name:</span>
            <span className="right-label">Nguyen Van Bau</span>
          </div>
          <hr />

          <div>
            <span className="left-label">Drop-off:</span>
            <span className="right-label">20:00 19/12/2010</span>
          </div>
          <hr />

          <div>
            <span className="left-label">Number of charged items:</span>
            <span className="right-label">4</span>
          </div>
          <hr />

          <div className="wrap-date-time">
            <div className="date-booking" >
              <WhaleloInput
                selectAble={true}
                name="date-pickup"
                label="Date to pick up*"
              />
            </div>
            <div className="empty"></div>
            <div className="time-booking">
              <WhaleloInput
                selectAble={true}
                name="time-pickup"
                label="Time to pick up*"
              />
            </div>
          </div>
          <hr />

          <div>
            <span className="left-label">Total Amount:</span>
            <span className="right-label">{vndStyle(700000)} đ - {15.5}$</span>
          </div>
          <hr />

          <div>
            <span className="left-label">Luggage Photos:</span>
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