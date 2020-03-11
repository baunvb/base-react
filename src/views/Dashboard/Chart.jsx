import React from "react";
import { Bar } from 'react-chartjs-2';
import { vndStyle } from "common/function.jsx"
import KeyboardArrowLeft from "../../assets/img/wlicon/previous.svg";
import KeyboardArrowRight from "../../assets/img/wlicon/next.svg";
import * as requestApi from '../../api/requestApi';
import { REPORT_ACTION } from '../../actions/ReportActions.js';
import { REPORT_TYPE, API } from '../../config/Constant';
import Circle from 'components/Progress/Circle'

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

    fetchListComplete = (type, index) => {
        this.loadding.show()
        let { chartData } = this.props;
        let dateStr = chartData.labels[index]; //format dd\mm\yyyy
        let dateElement = dateStr.split('/');
        var body = {}
        var fetchAction;
        switch (type) {
            case REPORT_ACTION.UPDATE_ACTIVE_INDEX_DAY:
                body.type = REPORT_TYPE.DAY;
                body.year = parseInt(dateElement[2]);
                body.month = parseInt(dateElement[1]);
                body.day = parseInt(dateElement[0]);
                fetchAction = REPORT_ACTION.FETCH_LIST_COMPLETE_DAY
                break;
            case REPORT_ACTION.UPDATE_ACTIVE_INDEX_MONTH:
                body.type = REPORT_TYPE.MONTH;
                body.year = parseInt(dateElement[1]);
                body.month = parseInt(dateElement[0]);
                fetchAction = REPORT_ACTION.FETCH_LIST_COMPLETE_MONTH
                break;
            case REPORT_ACTION.UPDATE_ACTIVE_INDEX_YEAR:
                body.type = REPORT_TYPE.YEAR;
                body.year = parseInt(dateElement[0]);
                fetchAction = REPORT_ACTION.FETCH_LIST_COMPLETE_YEAR
                break;
        }

        requestApi.postByToken(API.FETCH_LIST_COMPLETE, body, (res) => {
            if (res.code === 200) {
                this.props.updateState(fetchAction, res.data.appointments);
                var self = this;
                setTimeout(function () {
                    self.loading.hide()
                }, 500)
            }
        })
    }

    onElementsClick = (index) => {
        console.log("onElementsClick", index);
        switch (this.props.type) {
            case REPORT_TYPE.DAY:
                this.props.updateAtiveIndex(REPORT_ACTION.UPDATE_ACTIVE_INDEX_DAY, index);
                this.fetchListComplete(REPORT_ACTION.UPDATE_ACTIVE_INDEX_DAY, index)
                break;
            case REPORT_TYPE.MONTH:
                this.props.updateAtiveIndex(REPORT_ACTION.UPDATE_ACTIVE_INDEX_MONTH, index)
                this.fetchListComplete(REPORT_ACTION.UPDATE_ACTIVE_INDEX_MONTH, index)
                break;
            case REPORT_TYPE.YEAR:
                this.props.updateAtiveIndex(REPORT_ACTION.UPDATE_ACTIVE_INDEX_YEAR, index)
                this.fetchListComplete(REPORT_ACTION.UPDATE_ACTIVE_INDEX_YEAR, index)

                break;
            default:
                break;
        }
    }

    render() {

        return (
            <div>
                <Circle ref={ref => this.loadding = ref} />
                <div className="chart-container">
                    <Bar data={this.props.chartData} options={options}
                        height={200}
                        onElementsClick={element => {
                            if (element.length !== 0) {
                                let index = element[0]._index;
                                this.onElementsClick(index);
                            }
                        }}
                    />
                </div>
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