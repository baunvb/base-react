import React from 'react';
import ItemOrder from 'views/Station/ItemOrder.jsx';
import SearchComponent from "views/Station/SearchComponent.jsx";
import "views/Station/station.css"
import iconAdd from 'assets/img/wlicon/icon_add.png';
import { STORAGE_STATUS } from 'config/Constant.js';
class CompleteBookingMng extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }

  }

  componentDidMount() {

  }

  render() {
    const { completeList } = this.props;

    return (
      <div>
        <SearchComponent />
        {
          completeList.map((item, key) => {
            return (
              <ItemOrder
                item={item}
                key={key}
                type={STORAGE_STATUS.COMPLETE}
                {...this.props}
              />
            )
          }
          )
        }
        
      </div>
    )
  }

}

export default CompleteBookingMng