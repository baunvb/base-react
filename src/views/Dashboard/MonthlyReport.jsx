import React from 'react';
import DetailReport from 'views/Dashboard/DetailReport.jsx';
import WhaleloInput from 'components/CustomInput/WhaleloInput.jsx';
import {ITEMS_YEAR } from 'config/Constant';
import {REPORT_ACTION} from '../../actions/ReportActions'

class MonthlyReport extends React.Component {
  constructor(props) {
    super(props);
  }

  onSetDate = (event, inst, name) => {
    const value = inst.getVal();
    this.setState({
      [name]: value
    })
    this.props.updateState(REPORT_ACTION.UPDATE_MONTHLY_YEAR, value);
    this.props.getChartData()

  }

  render() {
    const chartData = {
      labels: this.props.showChartDataMonth.label,
      datasets: [
        {
          data: this.props.showChartDataMonth.data,
          pointBackgroundColor: "#FFFFFF",
          backgroundColor: this.props.showChartColorMonth,
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
              value={this.props.monthlyYear}
              type="select"
              items={ITEMS_YEAR}
              name="year"
              label="Select year*"
              onSet={this.onSetDate}
            />
          </div>
        </div>
        <DetailReport
          {...this.props}
          chartData={chartData}
          datapoint={this.props.summaryMonth}

        />
      </div>
    )
  }

}

export default MonthlyReport