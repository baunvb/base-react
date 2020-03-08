import React from 'react';
import DetailReport from 'views/Dashboard/DetailReport.jsx';
import WhaleloInput from 'components/CustomInput/WhaleloInput.jsx';
import { ITEMS_MONTH, ITEMS_YEAR } from 'config/Constant';
import {REPORT_ACTION} from '../../actions/ReportActions'
import './dashboard.css'
class DailyReport extends React.Component {
  constructor(props) {
    super(props);
  }

  onSetDate = (event, inst, name) => {
    const value = inst.getVal();
    this.setState({
      [name]: value
    })

    switch(name){
      case "year":
        this.props.updateState(REPORT_ACTION.UPDATE_DAILY_YEAR, value);
        break;
      case "month":
      this.props.updateState(REPORT_ACTION.UPDATE_DAILY_MONTH, value)
        break;
    }
    this.props.getChartData()
  }

  render() {
    const chartData = {
      labels: this.props.showChartDataDay.label,
      datasets: [
        {
          data: this.props.showChartDataDay.data,
          pointBackgroundColor: "#FFFFFF",
          backgroundColor: this.props.showChartColorDay,
          borderColor: '#3B4EDC',
          borderWidth: 1
        }
      ]
    }
  
    return (
      <div>
        <div className="wrap-select">
          <div className="select">
            <WhaleloInput
              selectAble={true}
              value={this.props.dailyYear}
              type="select"
              items={ITEMS_YEAR}
              name="year"
              label="Select year*"
              onSet={this.onSetDate}
            />
          </div>
          <div className="select">
            <WhaleloInput
              selectAble={true}
              value={this.props.dailyMonth}
              type="select"
              items={ITEMS_MONTH}
              name="month"
              label="Select month*"
              onSet={this.onSetDate}
            />
          </div>
        </div>
        <DetailReport
          {...this.props}
          chartData={chartData}
          datapoint={this.props.summaryDay}
        />
      </div>
    )
  }

}

export default DailyReport