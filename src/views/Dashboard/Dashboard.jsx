import React from "react";
import PropTypes, { number } from "prop-types";

// material-ui components
import withStyles from "material-ui/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import ItemGrid from "components/Grid/ItemGrid.jsx";
import FormControl from "material-ui/Form/FormControl";
import Select from "material-ui/Select";
import MenuItem from "material-ui/Menu/MenuItem";
import dashboardStyle from "assets/jss/views/dashboardStyle";
import Chart from 'views/Dashboard/Chart.jsx'
import TableList from 'views/Dashboard/TableList.jsx'
import PriceContent from 'views/Dashboard/PriceContent.jsx'
import BootstrapInput from 'views/Dashboard/BootstrapInput.jsx'

// import CanvasJSReact from "assets/canvasjs/canvasjs.react";
// import { CanvasJS } from "assets/canvasjs/canvasjs.react";
// import { CanvasJSChart } from "assets/canvasjs/canvasjs.react";
import JssProvider from 'react-jss/lib/JssProvider';
import { createGenerateClassName } from '@material-ui/core/styles';

var type = 'Bar'

const generateClassName = createGenerateClassName({
  //dangerouslyUseGlobalCSS: true,
  productionPrefix: 'dashboard',
});

const filterType = [
  { lable: "Ngày", value: "day" },
  { lable: "Tuần", value: "week" },
  { lable: "Tháng", value: "month" },
  { lable: "Năm", value: "year" }
]

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: "month",
      price: 0,
      chuyenxe: 0,
      currentDate: ""
    }
  }

  handleChangeFilter = (e) => {
    let value = e.target.value
    this.setState({
      filter: value
    })
    this.chart.handleChangeFilter(value);
  }

  updateStatePrice = (key, value) => {
    this.price.updateStatePrice(key, value);
  }
  updateStateTable = (key, value) => {
    this.table.updateStateTable(key, value);
  }
  getListTrip = (label) => {
    this.table.getListTrip(label);
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>
          <ItemGrid xs={12} sm={12} md={12} style={{ flexBasis: "100%" }}>
            <div className="wraperCard" >
              <JssProvider generateClassName={generateClassName}>
                <ItemGrid xs={12} sm={12} md={12}>
                  <div style={{ float: "right", marginRight: "4px", marginBottom: "10px" }}>
                    <JssProvider generateClassName={generateClassName}>
                      <FormControl>
                        <Select
                          MenuProps={{
                            className: classes.select
                          }}
                          classes={{
                            select: classes.select
                          }}
                          input={<BootstrapInput />}
                          value={this.state.filter}
                          inputProps={{
                            onChange: event => this.handleChangeFilter(event),
                            name: 'filter',
                            id: "filter"
                          }}
                        >


                          {
                            filterType.map((element, key) => {
                              return (
                                <MenuItem
                                  key={key}
                                  classes={{
                                    root: classes.selectMenuItem,
                                    selected: classes.selectMenuItemSelected
                                  }}
                                  value={element.value}
                                >
                                  {element.lable}
                                </MenuItem>
                              )
                            })
                          }
                        </Select>
                      </FormControl>
                    </JssProvider>
                  </div>
                  <div>
                    <span className="pageTitle">Báo Cáo</span>
                  </div>
                </ItemGrid>

              </JssProvider>
                <Chart
                  filter={this.state.filter}
                  updateStatePrice={this.updateStatePrice}
                  updateStateTable={this.updateStateTable}
                  getListTrip={this.getListTrip}
                  ref={instance => { this.chart = instance; }}
                >
                </Chart>

              <PriceContent
                ref={instance => { this.price = instance; }}
                price={this.state.price}
                chuyenxe={this.state.chuyenxe}
                currentDate={this.state.currentDate}
              />

              <ItemGrid xs={12} sm={12} md={12}>
                <TableList
                  ref={instance => { this.table = instance; }}
                  list={this.state.list}
                  length={this.state.length}
                  filter={this.state.filter}
                  chuyenxe={this.state.chuyenxe}
                >

                </TableList>
              </ItemGrid>
            </div>

          </ItemGrid>

        </GridContainer>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
