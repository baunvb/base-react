import React from 'react';
import Chart from 'views/Dashboard/Chart.jsx';
import PriceContent from 'views/Dashboard/PriceContent.jsx';
import ListBookingReport from './ListBookingReport';
class DetailReport extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    return (
      <div>
        <Chart
          chartData={this.props.chartData}
          {...this.props}
        />
        <PriceContent datapoint={this.props.datapoint} />

        <ListBookingReport {...this.props} data={this.props.listData}/>
      </div>
    )
  }

}

export default DetailReport;