import React from 'react';
import DetailReport from 'views/Dashboard/DetailReport.jsx';

class YearlyReport extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const chartData = {
      labels: this.props.showChartDataYear.label,
      datasets: [
        {
          data: this.props.showChartDataYear.data,
          pointBackgroundColor: "#FFFFFF",
          backgroundColor: this.props.showChartColorYear,
          borderColor: '#3B4EDC',
          borderWidth: 1
        }
      ]
    }

    return (
      <div>
        <DetailReport
          {...this.props}
          chartData={chartData}
          datapoint={this.props.summaryYear}

        />
      </div>
    )
  }

}

export default YearlyReport