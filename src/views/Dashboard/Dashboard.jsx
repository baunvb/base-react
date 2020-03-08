import React from "react";
import PropTypes, { number } from "prop-types";

// material-ui components
import withStyles from "material-ui/styles/withStyles";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import "views/Station/station.css"
import * as requestApi from '../../api/requestApi'
import { API } from '../../config/Constant'

import { REPORT_TYPE } from '../../config/Constant.js'
import dashboardStyle from "assets/jss/views/dashboardStyle";
import DailyReport from 'views/Dashboard/DailyReport.jsx'
import MonthlyReport from 'views/Dashboard/MonthlyReport.jsx'
import YearlyReport from 'views/Dashboard/YearlyReport.jsx'
import TabPanel from 'components/Tab/TabPanel.jsx';
import { connect } from 'react-redux'
import { REPORT_ACTION } from '../../actions/ReportActions'
import JssProvider from 'react-jss/lib/JssProvider';
import { createGenerateClassName } from '@material-ui/core/styles';
import ReportReducer from "../../reducer/ReportReducer";
const generateClassName = createGenerateClassName({
  //dangerouslyUseGlobalCSS: true,
  productionPrefix: 'dashboard',
});

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    }
  }

  handleChange = (event, newValue) => {
    this.setState({
      value: newValue
    });
  };

  // accept array of object: {label, prices}
  normalizeData = (array) => {
    var datas = [];
    var labels = [];
    var bookings = [];
    array.map((item, key) => {
      datas.push(item.prices);
      labels.push(item.label);
      bookings.push(item.books)
    })

    return { label: labels, data: datas, booking: bookings }
  }

  getChartDataDaily = (year, month) => {
    requestApi.postByToken(API.FETCH_REPORT, { type: REPORT_TYPE.DAY, month: month, year: year }, (res) => {
      if (res.code === 200) {
        var prices = res.data.prices;
        var data = this.normalizeData(prices)
        this.props.updateState(REPORT_ACTION.FETCH_CHART_DATA_DAY, data)
      }
    });
  }

  getChartDataMonthly = (year) => {
    requestApi.postByToken(API.FETCH_REPORT, { type: REPORT_TYPE.MONTH, year: year }, (res) => {
      if (res.code === 200) {
        var prices = res.data.prices;
        var data = this.normalizeData(prices)
        this.props.updateState(REPORT_ACTION.FETCH_CHART_DATA_MONTH, data)
      }
    });
  }

  getChartDataYearly = () => {
    requestApi.postByToken(API.FETCH_REPORT, { type: REPORT_TYPE.YEAR }, (res) => {
      if (res.code === 200) {
        var prices = res.data.prices;
        var data = this.normalizeData(prices)
        this.props.updateState(REPORT_ACTION.FETCH_CHART_DATA_YEAR, data)
      }
    })
  }

  componentDidMount() {
    this.getChartDataDaily(this.props.dailyYear, this.props.dailyMonth);
    this.getChartDataMonthly(this.props.monthlyYear);
    this.getChartDataYearly();
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("componentDidUpdate");
    console.log(prevProps, prevState);
  }
  render() {
    console.log("RERENDER Dashboard", this.props.showChartColorDay)
    console.log("RERENDER Dashboard", this.props.colorChartDay)

    const { value } = this.state;
    return (
      <JssProvider generateClassName={generateClassName}>
        <div className="wrap-tab">
          <JssProvider generateClassName={generateClassName}>
            <AppBar position="static" color="#FFFFFF" classes={{ root: "app-bar" }}>
              <Tabs
                classes={{ indicator: "tab-indicator", flexContainer: "tabs-flexContainer " }}
                value={value}
                onChange={this.handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="full width tabs example"
              >
                <Tab classes={{ selected: "tab-selected", root: "tab-root" }} label="Daily" {...a11yProps(0)} />
                <Tab classes={{ selected: "tab-selected", root: "tab-root" }} label="Monthly" {...a11yProps(1)} />
                <Tab classes={{ selected: "tab-selected", root: "tab-root" }} label="Yearly" {...a11yProps(2)} />
              </Tabs>
            </AppBar>
          </JssProvider>

          <JssProvider generateClassName={generateClassName}>
            <TabPanel value={value} index={0}>
              <div className="main-station">
                <DailyReport
                  ref={ref => this.daily = ref}
                  getChartData={() => {
                    this.getChartDataDaily(this.props.dailyYear, this.props.dailyMonth)
                  }}
                  type={REPORT_TYPE.DAY}
                  {...this.props}
                />
              </div>

            </TabPanel>
          </JssProvider>

          <JssProvider generateClassName={generateClassName}>
            <TabPanel value={value} index={1}>
              <div className="main-station">
                <MonthlyReport
                  ref={ref => this.monthly = ref}
                  getChartData={() => {
                    this.getChartDataMonthly(this.props.monthlyYear)
                  }}
                  type={REPORT_TYPE.MONTH}
                  {...this.props}
                />
              </div>
            </TabPanel>
          </JssProvider>

          <JssProvider generateClassName={generateClassName}>
            <TabPanel value={value} index={2}>
              <div className="main-station">
                <YearlyReport
                  ref={ref => this.yearly = ref}
                  type={REPORT_TYPE.YEAR}
                  {...this.props}
                />
              </div>
            </TabPanel>
          </JssProvider>

        </div>
      </JssProvider>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    showChartDataDay: state.report.showChartDataDay,
    showChartDataMonth: state.report.showChartDataMonth,
    showChartDataYear: state.report.showChartDataYear,
    showChartColorDay: state.report.showChartColorDay,
    showChartColorMonth: state.report.showChartColorMonth,
    showChartColorYear: state.report.showChartColorYear,

    summaryDay: state.report.summaryDay,
    summaryMonth: state.report.summaryMonth,
    summaryYear: state.report.summaryYear,

    dailyYear: state.report.dailyYear,
    dailyMonth: state.report.dailyMonth,

    monthlyYear: state.report.monthlyYear
  }
}
const mapDispatchToProps = dispatch => {
  return {
    updateState: (type, data) => dispatch({ type, data }),
    updatePageIndex: (type) => dispatch({ type }),
    updateAtiveIndex: (type, data) => dispatch({ type, data }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(dashboardStyle)(Dashboard));

// export default connect(mapStateToProps, mapDispatchToProps)(withStyles(sidebarStyle)(Sidebar))
