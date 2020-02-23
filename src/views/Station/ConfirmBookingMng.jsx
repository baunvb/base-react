import React from 'react';
import ItemOrder from 'views/Station/ItemOrder.jsx';
import SearchComponent from "views/Station/SearchComponent.jsx";
import "views/Station/station.css"
import iconAdd from 'assets/img/wlicon/icon_add.png';
import { STORAGE_STATUS } from 'config/Constant.js';
class ConfirmBookingMng extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }

  }

  componentDidMount() {

  }

  render() {
    return (
      <div>
        <SearchComponent />
        <ItemOrder
          type={STORAGE_STATUS.CONFIRM}
          {...this.props} />
        <ItemOrder
          type={STORAGE_STATUS.CONFIRM}
          {...this.props} />
        <ItemOrder
          type={STORAGE_STATUS.CONFIRM}
          {...this.props} />
        
      </div>
    )
  }

}

export default ConfirmBookingMng