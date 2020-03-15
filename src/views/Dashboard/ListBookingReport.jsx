import React from 'react';
import ItemOrder from '../Station/ItemOrder';
import { STORAGE_STATUS } from 'config/Constant.js';

class ListBookingReport extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { data } = this.props;
    return (
      <div className="list">
        {
          data.map((item, key) => {
            return (
              <ItemOrder
                time={item.pick_up_time}
                item={item}
                key={key}
                status={STORAGE_STATUS.COMPLETE}
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

export default ListBookingReport