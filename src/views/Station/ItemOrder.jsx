import React from 'react';
import 'views/Station/station.css';
import {vndStyle, normalizeDateTime} from 'common/function.jsx';
import { STORAGE_STATUS } from 'config/Constant.js';

class ItemOrder extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    }

  }

  componentDidMount(){

  }

  openDetailScreen = () => {
    const {type} = this.props;
    switch(type) {
      case  STORAGE_STATUS.APPOINTMENT:
        this.props.history.push({
          pathname: '/confirmBooking',
          data: this.props.item
        })
        break;
      case  STORAGE_STATUS.CONFIRM:
        this.props.history.push({pathname: '/completebooking', data: this.props.item})
        break;
      case  STORAGE_STATUS.COMPLETE:
        this.props.history.push({pathname: '/bookingdetail',  data: this.props.item})
        break;
    }
  }

  render(){
    const {item} = this.props;
    const DateTime = normalizeDateTime(item.drop_off_time);
    return (
      <div className="wrap-item-order"
        onClick={this.openDetailScreen}
      >
          <div className="date-time">
              <span className="time">{DateTime.time}</span>
              <span className="date">{DateTime.date}</span>
          </div>

          <div className="wrap-user-info">
            <span>
              <span className="order-id">#{item.serial}</span>
              <span className="order-email">{item.email}</span>
            </span>
            <span className="order-address">{item.station_address}</span>
          </div>

          <div className="wrap-price-order">
              <span className="order-item">{item.package_total} Items </span>
              <span className="order-price">{vndStyle(item.price)} đ</span>
          </div>

      </div>
    )
  }

}

export default ItemOrder