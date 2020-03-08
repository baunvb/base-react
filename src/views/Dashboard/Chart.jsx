import React from "react";
import { Bar } from 'react-chartjs-2';
import { vndStyle } from "common/function.jsx"
import KeyboardArrowLeft from "../../assets/img/wlicon/previous.svg";
import KeyboardArrowRight from "../../assets/img/wlicon/next.svg";
import IconButton from "components/CustomButtons/IconButton.jsx";
import { REPORT_ACTION } from '../../actions/ReportActions.js';
import { REPORT_TYPE } from '../../config/Constant'
import './chart.css'
const options = {
    event: "click",
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true,
                callback: function (label, index, labels) {
                    if (label >= 1000 && label < 1000000)
                        return Math.round(label / 1000) + " K";
                    if (label === 0) {
                        return 0
                    }

                    if (label > 0 && label < 1000)
                        return label

                    return Math.round(label / 1000000) + " M"
                }
            },

        }],
        xAxes: [{
            maxTicksLimit: 5,
            offset: true,
            type: 'category',
            distribution: 'linear',
            unitStepSize: 2,
            ticks: {
                stepSize: 2,
                min: 0,
                max: 5
            },
            stacked: true,
            gridLines: {
                display: false
            },
        }]
    },
    tooltips: {
        callbacks: {
            title: function (tooltipItem, data) {
                return data.labels[0]
            },
            label: function (tooltipItem, data) {
                var label = data.datasets[tooltipItem.datasetIndex].label || '';
                if (label) {
                    label += ': ';
                }
                label += vndStyle(tooltipItem.yLabel) + " VNĐ"; //yLablel is value
                return label;
            }
        },
        mode: 'index',
        intersect: true,
        responsive: true,
        hover: {
            mode: 'index',
            intersect: true
        }
    },
    legend: {
        display: false
    }
}

class Chart extends React.Component {
    constructor(props) {
        super(props)
    }

    eventHandlerSwipedLeft = (eventData) => {
        //reduce
        switch (this.props.type) {
            case REPORT_TYPE.DAY:
                this.props.updatePageIndex(REPORT_ACTION.REDUCE_PAGE_INDEX_DAY);
                break;
            case REPORT_TYPE.MONTH:
                this.props.updatePageIndex(REPORT_ACTION.REDUCE_PAGE_INDEX_MONTH);
                break;
            case REPORT_TYPE.YEAR:
                this.props.updatePageIndex(REPORT_ACTION.REDUCE_PAGE_INDEX_YEAR);
                break;
            default:
                break;
        }
    }

    eventHandlerSwipedRight = (eventData) => {
        //incre
        switch (this.props.type) {
            case REPORT_TYPE.DAY:
                this.props.updatePageIndex(REPORT_ACTION.INCRE_PAGE_INDEX_DAY)
                break;
            case REPORT_TYPE.MONTH:
                this.props.updatePageIndex(REPORT_ACTION.INCRE_PAGE_INDEX_MONTH)
                break;
            case REPORT_TYPE.YEAR:
                this.props.updatePageIndex(REPORT_ACTION.INCRE_PAGE_INDEX_YEAR)
                break;
            default:
                break;
        }
    }

    onElementsClick = (index) => {
        console.log("onElementsClick", index);
        switch (this.props.type) {
            case REPORT_TYPE.DAY:
                this.props.updateAtiveIndex(REPORT_ACTION.UPDATE_ACTIVE_INDEX_DAY, index)
                break;
            case REPORT_TYPE.MONTH:
                this.props.updateAtiveIndex(REPORT_ACTION.UPDATE_ACTIVE_INDEX_MONTH, index)
                break;
            case REPORT_TYPE.YEAR:
                this.props.updateAtiveIndex(REPORT_ACTION.UPDATE_ACTIVE_INDEX_YEAR, index)
                break;
            default:
                break;
        }
    }

    render() {

        return (
            <div>
                <Bar data={this.props.chartData} options={options}
                    style={{ width: "100px", height: "200px" }}
                    height={200}
                    onElementsClick={element => {
                        if (element.length !== 0) {
                            let index = element[0]._index;
                            this.onElementsClick(index);
                        }
                    }}
                />
                <div className="navigate">
                    <img
                        className="icon-left"
                        onClick={(e) => {
                            this.eventHandlerSwipedRight(e)
                        }}
                        src={KeyboardArrowLeft}

                    />

                    <img className="icon-right"
                        onClick={(e) => {
                            this.eventHandlerSwipedLeft(e)
                        }}
                        src={KeyboardArrowRight}
                    />

                </div>
            </div>


        )
    }



}
export default Chart;