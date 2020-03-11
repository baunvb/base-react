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
      searchStr: ""
    }

  }
  onSearch = (e) => {
    this.setState({
      searchStr: e.target.value
    })
  }
  componentDidMount() {

  }

  render() {
    const { completeList } = this.props;

    return (
      <div>
        <SearchComponent 
          onSearch = {this.onSearch}
        />
        {
          completeList.map((item, key) => {
            if(item.guest_name.toLowerCase().includes(this.state.searchStr.toLowerCase()))
            return (
              <ItemOrder
                time={item.drop_off_time}
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