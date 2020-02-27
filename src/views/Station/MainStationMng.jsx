import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import "views/Station/station.css"

import AppointmentMng from "views/Station/AppointmentMng.jsx";
import ConfirmBookingMng from "views/Station/ConfirmBookingMng.jsx";
import CompleteBookingMng from "views/Station/CompleteBookingMng.jsx";

import { API } from 'config/Constant.js'
import * as requestApi from 'api/requestApi.js';
import { connect } from "react-redux";
import { STORAGE_ACTION } from 'actions/StorageActions.js'
import GridContainer from "components/Grid/GridContainer.jsx";
import ItemGrid from "components/Grid/ItemGrid.jsx";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <div p={3}>{children}</div>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

class MainStationMng extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 0
    }
  }

  handleChange = (event, newValue) => {
    this.setState({
      value: newValue
    })
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
  }

  render() {
    const { value } = this.state;

    return (
          <div className="wrap-tab">
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
                <Tab classes={{ selected: "tab-selected", root: "tab-root" }} label="Appointment" {...a11yProps(0)} />
                <Tab classes={{ selected: "tab-selected", root: "tab-root" }} label="Storage" {...a11yProps(1)} />
                <Tab classes={{ selected: "tab-selected", root: "tab-root" }} label="Completion" {...a11yProps(2)} />
              </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
              <div className="main-station">
                <AppointmentMng {...this.props} />
              </div>

            </TabPanel>
            <TabPanel value={value} index={1}>
              <div className="main-station">
                <ConfirmBookingMng {...this.props} />
              </div>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <CompleteBookingMng {...this.props} />
            </TabPanel>
          </div>


    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateState: (type, data) => dispatch({ type, data })
  }
}
const mapStateToProps = (state, ownProps) => {
  console.log("Store", state.storage)
  return {
    bookingList: state.storage.bookingList,
    confirmList: state.storage.confirmList,
    completeList: state.storage.completeList
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainStationMng)