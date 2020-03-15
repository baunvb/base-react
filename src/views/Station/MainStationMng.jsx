import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import "views/Station/station.css"

import AppointmentMng from "views/Station/AppointmentMng.jsx";
import ConfirmBookingMng from "views/Station/ConfirmBookingMng.jsx";
import CompleteBookingMng from "views/Station/CompleteBookingMng.jsx";
import Circle from 'components/Progress/Circle'

import { API } from 'config/Constant.js'
import * as requestApi from 'api/requestApi.js';
import { connect } from "react-redux";
import { STORAGE_ACTION } from 'actions/StorageActions.js'
import { createGenerateClassName } from '@material-ui/core/styles';
import JssProvider from 'react-jss/lib/JssProvider';
import TabPanel from 'components/Tab/TabPanel.jsx';
const generateClassName = createGenerateClassName({
  //dangerouslyUseGlobalCSS: true,
  productionPrefix: 'station',
});


function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

class MainStationMng extends React.Component {

  constructor(props) {
    super(props);
  }

  handleChange = (event, newValue) => {
    
    this.props.updateState(STORAGE_ACTION.STORAGE_TAB, newValue)
  };

  handleChangeIndex = index => {
    this.setState({
      value: index
    })
  };

  componentDidMount() {
    requestApi.postByToken(API.BOOKING_LIST, {}, (res) => {
      if (res.code === 200) {
        this.props.updateState(STORAGE_ACTION.BOOKING_LIST, res.data.appointments)
      }
    })

    requestApi.postByToken(API.CONFIRMED_LIST, {}, (res) => {
      if (res.code === 200) {
        this.props.updateState(STORAGE_ACTION.CONFIRM_LIST, res.data.appointments)
      }
    })

    requestApi.postByToken(API.COMPLETED_LIST, {}, (res) => {
      if (res.code === 200) {
        this.props.updateState(STORAGE_ACTION.COMPLETE_LIST, res.data.appointments)
      }
    })

    requestApi.getRequest(API.GET_PRICING, (res) => {
      if (res) {
        this.props.updateState(STORAGE_ACTION.PRICING_LIST, res);
      }
    })
    var self = this;
    setTimeout(function () {
      self.props.updateState(STORAGE_ACTION.IS_LOAD_DONE);
    }, 500)

  }

  render() {
    const { tabIndex } = this.props;

    return (
      <JssProvider generateClassName={generateClassName}>
        <div className="wrap-tab">
          {
            !this.props.isLoadDone &&
            <Circle show={true}/>
          }
          <JssProvider generateClassName={generateClassName}>

            <AppBar position="static" color="#FFFFFF" classes={{ root: "app-bar" }}>
              <Tabs
                classes={{ indicator: "tab-indicator", flexContainer: "tabs-flexContainer " }}
                value={tabIndex}
                onChange={this.handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="full width tabs example"
              >
                <Tab classes={{ selected: "tab-selected", root: "tab-root" }} label="Appointment" {...a11yProps(0)} />
                <Tab classes={{ selected: "tab-selected", root: "tab-root" }} label="Storage" {...a11yProps(1)} />
                <Tab classes={{ selected: "tab-selected", root: "tab-root" }} label="Completion" {...a11yProps(2)} />
              </Tabs>
            </AppBar>
          </JssProvider>
          <JssProvider generateClassName={generateClassName}>

            <TabPanel value={tabIndex} index={0}>
              <div className="main-station">
                <AppointmentMng {...this.props} />
              </div>

            </TabPanel>
          </JssProvider>
          <JssProvider generateClassName={generateClassName}>

            <TabPanel value={tabIndex} index={1}>
              <div className="main-station">
                <ConfirmBookingMng {...this.props} />
              </div>
            </TabPanel>
          </JssProvider>
          <JssProvider generateClassName={generateClassName}>

            <TabPanel value={tabIndex} index={2}>
              <CompleteBookingMng {...this.props} />
            </TabPanel>
          </JssProvider>

        </div>
      </JssProvider>


    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateState: (type, data) => dispatch({ type, data })
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    tabIndex: state.storage.tab,
    bookingList: state.storage.bookingList,
    confirmList: state.storage.confirmList,
    completeList: state.storage.completeList,
    isLoadDone: state.storage.isLoadDone
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainStationMng)