import React from 'react';
import Chart from 'views/Dashboard/Chart.jsx';
import PriceContent from 'views/Dashboard/PriceContent.jsx';
import TableList from 'views/Dashboard/TableList.jsx';
import ItemGrid from "components/Grid/ItemGrid.jsx";

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
        {/* <ItemGrid xs={12} sm={12} md={12}>
          <TableList 
            
          />
        </ItemGrid> */}
      </div>
    )
  }

}

export default DetailReport;