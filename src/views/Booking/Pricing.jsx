import React from 'react';
import { createGenerateClassName } from '@material-ui/core/styles';
import JssProvider from 'react-jss/lib/JssProvider';
import TabPanel from 'components/Tab/TabPanel.jsx';
import DetailPrincing from 'views/Booking/DetailPrincing.jsx';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import 'views/Booking/pricing.css';
import { connect } from "react-redux";
import { STORAGE_ACTION } from 'actions/StorageActions.js'
import { API } from 'config/Constant.js'
import * as requestApi from 'api/requestApi.js';
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

class Pricing extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 0,
      show: false
    }
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside(event) {
    console.log("OUT")

    if (this.pricingRef && !this.pricingRef.contains(event.target)) {
      console.log("OUT")
      this.setState({
        show: false
      })
    }
  }

  setWrapperRef(node) {
    this.pricingRef = node;
  }

  update = (key, value) => {
    this.setState({
      [key]: value
    })
  }

  handleChange = (event, newValue) => {
    this.setState({
      value: newValue
    })
  };

  componentDidMount(){
    document.addEventListener('mousedown', this.handleClickOutside);

    requestApi.getRequest(API.GET_PRICING, (res) => {
      if (res) {
        console.log("GET_PRICING", res)
        this.props.updateState(STORAGE_ACTION.PRICING_LIST, res);
      }
    })
  }

  render() {
    const { value, show } = this.state;
    console.log("SHOWWWWWWWWWW", show)
    return (
       show &&  <div className="over-alert">
          <div className="pricing-content" ref={this.setWrapperRef}>
            <div className="wrap-tab">
              <JssProvider generateClassName={generateClassName}>

                <AppBar position="static" color="#FFFFFF" classes={{ root: "app-bar-pricing" }}>
                  <Tabs
                    classes={{ indicator: "tab-indicator", flexContainer: "tabs-flexContainer " }}
                    value={value}
                    onChange={this.handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                  >
                    <Tab classes={{ selected: "tab-selected", root: "tab-root" }} label="Hourly rate" {...a11yProps(0)} />
                    <Tab classes={{ selected: "tab-selected", root: "tab-root" }} label="Daily rate" {...a11yProps(1)} />
                  </Tabs>
                </AppBar>
              </JssProvider>
              <JssProvider generateClassName={generateClassName}>

                <TabPanel value={value} index={0}>
                  <div>
                    <DetailPrincing 
                      data={this.props.pricing.hourly_rates}
                    />
                  </div>

                </TabPanel>
              </JssProvider>
              <JssProvider generateClassName={generateClassName}>

                <TabPanel value={value} index={1}>
                  <div>
                  <DetailPrincing 
                      data={this.props.pricing.daily_rates}
                    />
                  </div>
                </TabPanel>
              </JssProvider>

            </div>
          </div>
        </div>

    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    pricing: state.storage.pricing,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateState: (type, data) => dispatch({ type, data })
  }
}

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef : true }) (Pricing)