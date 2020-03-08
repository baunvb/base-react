import React from 'react';
import 'views/Booking/pricing.css';
import { vndStyle } from 'common/function.jsx';

const data = [
  {key: "1-6 hours", value: 60000},
  {key: "6-12 hours", value: 90000},
  {key: "12-24 hours", value: 150000}
]

function PriceRow(item) {
  return (
    <div className="table-row">
      <span className="text-bold">
        {item.key}
      </span>
      <span className="text-normal right">
        {vndStyle(item.value)} đ
      </span>
    </div>
  )
}

class DetailPrincing extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <div className="header">
          <span className="text-normal">Price per Item with size bigger than</span> <br />
          <span className="text-bold">40 x 30 x 10 (cm)</span>
        </div>
        <div className="price-table">
          <div className="table-row">
            <span className="text-bold">
              Hourly
            </span>
            <span className="text-bold right">
              Price from
            </span>
          </div>

          {
            this.props.data.map((item) => {
              return (PriceRow(item))
            })
          }
        </div>
        <div className="footer-discount">
            <span className="discount-text">We discount <strong>50%</strong> for items with size <br/> from <strong>40 x 30 x 10 (cm)</strong> and smaller</span>
        </div>
      </div>
    )
  }

}

export default DetailPrincing