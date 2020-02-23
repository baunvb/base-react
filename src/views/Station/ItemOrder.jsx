import React from 'react';
import 'views/Station/station.css';
import {vndStyle} from 'common/function.jsx';
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
        this.props.history.push('/confirmBooking')
        break;
      case  STORAGE_STATUS.CONFIRM:
        this.props.history.push('/completebooking')
        break;
      case  STORAGE_STATUS.COMPLETE:
        this.props.history.push('/detailbooking')
        break;
    }
  }

  render(){
    return (
      <div className="wrap-item-order"
        onClick={this.openDetailScreen}
      >
          <div className="date-time">
              <span className="time">13:10</span>
              <span className="date">19/10/2020</span>
          </div>

          <div className="wrap-user-info">
            <span>
              <span className="order-id">#{100}</span>
              <span className="order-email">{'baunvb@gmail.com'}</span>
            </span>
            <span className="order-address">{'1st, pham van bach, yen hoa, cau giay, ha noi 100000'}</span>
          </div>

          <div className="wrap-price-order">
              <span className="order-item">{3} Items </span>
              <span className="order-price">{vndStyle(1000000)} đ</span>
          </div>

      </div>
    )
  }

}

export default ItemOrder