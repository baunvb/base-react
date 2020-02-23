import React from "react";
import * as requestApi from 'api/requestApi';
import { vndStyle } from "common/function.jsx"

import { Bar } from 'react-chartjs-2';
import { Swipeable } from 'react-swipeable'
import IconButton from "components/CustomButtons/IconButton.jsx";
import KeyboardArrowLeft from "material-ui-icons/KeyboardArrowLeft";
import KeyboardArrowRight from "material-ui-icons/KeyboardArrowRight";

class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            maxNumberPrice: 0,
            filter: this.props.filter,
            number_price: 0,
            index: 0,
            labels: [],
            labelsOfWeek: [],
            dataOfWeek: [],
            data: [],
            list: [],
            length: 0,
            numberOfTrip: [],
            price: 0,
            chuyenxe: 0,
            labels2: [],  // state tạm của labels
            data2: [], //state tạm của data
            numberOfTrip2: [], //state tam trip, lấy data từ server
            backgroundColor: '#FF7900',
        }

        this.getDataChart = this.getDataChart.bind(this);
    }

    handleChangeFilter = (value) => {
        this.setState((prevState, _) => ({
            filter: value,
            labels2: [],
            data2: [],
            numberOfTrip2: [],
            index: 0,
            number_price: 0,
            maxNumberPrice: 0,
            labels: [],
            data: [],
            dataOfWeek: [],
            numberOfTrip: [],
            labelsOfWeek: [],

        }), () => this.getDataChart())
        this.updateStateTable('filter', value);
    }

    componentDidMount() {
        this.getDataChart();
    }

    componentWillMount(){
        const innerWidth = window.innerWidth;
        var chartHeight = 100;
        if(innerWidth <= 768){
            chartHeight = 200
        }
        this.setState({
            chartHeight: chartHeight
        })
    }
    getStartEndDay = (label) => {
        var arr = label.split("/");
        var date = new Date(arr[2], arr[0] - 1, arr[1]);
        var day = date.getDay(),
            diff = date.getDate() - day + (day == 0 ? -6 : 1);
        let startDate = new Date(date.setDate(diff));
        let start = startDate.getDate() + "/" + (startDate.getMonth() + 1) + "/" + startDate.getFullYear();
        let lastDate = new Date(startDate.getTime() + 6 * 24 * 60 * 60 * 1000);
        let end = lastDate.getDate() + "/" + (lastDate.getMonth() + 1) + '/' + lastDate.getFullYear();
        return { start: start, end: end }
    }

    convertDateString = (labelWeek, labelOther) => {
        console.log("xxx", labelOther);
        const { filter, labels, labelsOfWeek } = this.state;
        if (filter === 'week') {
            let startEnd = this.getStartEndDay(labelOther)
            let yearStart = labelOther.split('/')[2];
            return "Tuần " + labelWeek + " Năm " + yearStart + ", " + startEnd['start'] + " - " + startEnd['end'];
        }
        let custom = labelOther;
        if (filter === 'month') {
            custom = "Tháng " + labelOther.replace("/01/", "/")
        }
        if (filter === 'day') {
            let arr = labelOther.split('/');
            custom = "Ngày " + arr[1] + "/" + arr[0] + "/" + arr[2]
        }
        if (filter === 'year') {
            custom = "Năm " + labelOther.replace("01/01/", "")
        }
        return custom;
    }

    getWeekByDate = (string) => {
        let date = new Date(string);
        var yearStart = new Date(Date.UTC(date.getFullYear(), 0, 1));
        var weekNo = Math.ceil((((date - yearStart) / 86400000) + 1) / 7);
        return weekNo;
    }

    reverseArray = (arr) => {
        let length = arr.length;
        if (length === 0) {
            return []
        }
        let i;
        let arr2 = []
        for (i = length - 1; i >= 0; i--) {
            arr2.push(arr[i])
        }
        console.log("xx 2", arr2)
        return arr2;
    }

    reverseChienLX = (input) => {
        var output = [];
        if (input.length === 0) {
            return [];
        }
        output = this.mergeChienLX(0, input.length - 1, input);
        return output;
    }

    mergeChienLX = (l, r, input, output) => {
        var h = Number.parseInt((l + r) / 2);
        if (l < r) {
            this.mergeChienLX(l, h, input);
            this.mergeChienLX(h + 1, r, input);
            output = [];
            for (var i = r; i >= h + 1; i--) {
                output.push(input[i]);
            }


            for (var i = h; i >= l; i--) {
                output.push(input[i]);
            }
        }
        return output;
    }

    updateStatePrice = (key, value) => {
        this.props.updateStatePrice(key, value);
    }
    updateStateTable = (key, value) => {
        this.props.updateStateTable(key, value);
    }
    getListTrip = (label) => {
        this.props.getListTrip(label);
    }

    getList = (Passindex) => {
        let temp = Passindex;
        const { labels, filter, labels2, labelsOfWeek, numberOfTrip, data, number_price, dataOfWeek, index } = this.state;
        console.log("xx", dataOfWeek);
        let labelsOfWeekTemp = labelsOfWeek;
        let dataOfWeekTemp = dataOfWeek
        let numberOfTripTemp = numberOfTrip;

        var labelsWeekReverse = this.reverseChienLX(labelsOfWeekTemp);
        var dataWeekReverse = this.reverseChienLX(dataOfWeekTemp);
        var tripReverse = this.reverseChienLX(numberOfTripTemp);

        Passindex = index * 7 + Passindex;
        //this.table.updateStateTable("list", []);

        if (filter === "week") {
            var label = this.reverseChienLX(labels)[(6 - temp) + 7 * index];
            var labelWeek = labelsWeekReverse[(6 - temp) + 7 * index];
            this.updateStatePrice("currentDate", this.convertDateString(labelWeek, label));
            this.getListTrip(label);
        } else {
            var label = labels[Passindex];
            var labelWeek = labelsWeekReverse[(6 - temp) + 7 * index];
            this.updateStatePrice("currentDate", this.convertDateString(labelWeek, label));
            this.getListTrip(label);
        }

        if (filter === "week") {
            var currentNumTrip = tripReverse[(6 - temp) + 7 * index]
            this.updateStatePrice("chuyenxe", currentNumTrip);
            this.updateStatePrice("price", dataWeekReverse[(6 - temp) + 7 * index]);
            this.updateStateTable("chuyenxe", currentNumTrip);
        } else {
            var currentNumTrip = numberOfTrip[Passindex]
            this.updateStatePrice("chuyenxe", currentNumTrip);
            this.updateStatePrice("price", data[Passindex]);
            this.updateStateTable("chuyenxe", currentNumTrip);

        }

    }

    showDataChart = () => {
        const { number_price } = this.state;
        //if (number_price > 0) {
        this.setState((prevState, _) => ({
            index: (prevState.index - 1) < 0 ? 0 : prevState.index - 1,
            number_price: prevState.number_price - 1
        }))
        //}

    }

    getNewDataChart = () => {
        if (this.state.filter === "year") {
            return;
        }
        var { index } = this.state;
        this.setState((prevState, _) => ({
            number_price: prevState.number_price + 1,
            index: (prevState.index) + 1
        }), () => {
            console.log("XXXX", this.state.number_price, this.state.maxNumberPrice)
            if ((index + 1) % 2 === 0) {
                console.log("Load new data");
                this.getDataChart();
                this.setState((prevState, _) => ({
                    maxNumberPrice: prevState.maxNumberPrice + 1
                }))
            } else {
                this.setState((prevState, _) => ({
                    number_price: prevState.number_price - 1 < 0 ? 0 : prevState.number_price - 1
                }))
            }
        })

        // var {number_price, maxNumberPrice} = this.state;
        // if()
        // this.setState((prevState, _) => ({
        //   number_price: prevState.number_price + 1,
        // }), () => this.getDataChart())

    }

    getDataChart() {
        this.setState({
            // labels: [],
            // data: [],
            // labelsOfWeek: [],
            // dataOfWeek: [],
            list: [],
            labels2: [],  // state tạm của labels
            data2: [], //state tạm của data
            numberOfTrip2: [] //state tam trip, lấy data từ server

        })
        const self = this;
        let { filter } = this.state;
        let postPre = ""  //user to formated time labels
        if (filter == "month") {
            postPre = "01/"
        }
        if (filter == "year") {
            postPre = "01/01/"
        }
        requestApi.postByToken('salepoints/getAllPrice', { type_get: this.state.filter, number: this.state.number_price }, (res) => {
            console.log("salepoints/getAllPrice", res);
            if (res.data.data.length === 0 || res.message === false) {
                return
            }
            res.data.data.map((prop, key) => {
                self.setState((prevState, _) => ({
                    labels2: [...prevState.labels2, filter == 'week' ? (postPre + prop.time.split(" ")[1]) : (postPre + prop.time)],
                    data2: [...prevState.data2, prop.price],
                    numberOfTrip2: [...prevState.numberOfTrip2, prop.number_trip]
                }))
            })

            // convert time format dd/mm/yyyy to mm/dd/yyyy
            if (filter === "day" || filter === "year") {
                var { labels2, data2, numberOfTrip2 } = self.state;
                console.log("Full", labels2)
                self.setState((prevState, _) => ({
                    labels: [...prevState.labels, ...labels2],
                    data: [...prevState.data, ...data2],
                    numberOfTrip: [...prevState.numberOfTrip, ...numberOfTrip2],
                }))
            }
            if (filter === "month") {
                let labelsTemp = [];
                self.state.labels2.map((element, key) => {
                    let arr = element.split('/');
                    let arr2 = arr[1] + "/" + arr[0] + "/" + arr[2]
                    labelsTemp.push(arr2);
                })
                self.setState((prevState, _) => ({
                    labels: [...prevState.labels, ...labelsTemp],
                    data: [...prevState.data, ...prevState.data2],
                    numberOfTrip: [...prevState.numberOfTrip, ...prevState.numberOfTrip2]
                }))
            }

            // đảo ngược mảng tại đây
            if (filter === "week") {
                let labelsTemp = [];
                let { labels2, data2, numberOfTrip2 } = self.state;
                labels2.forEach(element => {
                    labelsTemp.push(self.getWeekByDate(element));
                })
                self.setState((prevState, _) => ({
                    labelsOfWeek: [...labelsTemp.reverse(), ...prevState.labelsOfWeek],
                    dataOfWeek: [...data2.reverse(), ...prevState.dataOfWeek],
                    labels: [...prevState.labels, ...labels2.reverse()],
                    numberOfTrip: [...numberOfTrip2.reverse(), ...prevState.numberOfTrip]
                }))
            }

            if (filter === "year") {
                let { labels, data, labels2, data2, numberOfTrip2, numberOfTrip } = self.state;
                let labelTemp = [...labels, ...labels2.slice(0, 1)];
                let dataTemp = [...data, ...data2.slice(0, 1)];
                let numberOfTripTemp = [...numberOfTrip, ...numberOfTrip2.slice(0, 1)];
                self.setState((prevState, _) => ({
                    labels: labelTemp.slice(0, 1),
                    data: dataTemp.slice(0, 1),
                    numberOfTrip: numberOfTripTemp.slice(0, 1)
                }))
            }

            self.setState((prevState, _) => ({
                currentDate: self.state.labels[0],
                price: self.state.data[0],
                chuyenxe: self.state.numberOfTrip[0]
            }), () => {
                self.getList(0);
            })
        });
    }

    onElementsClick = (index) => {
        console.log("onElementsClick", index);
        this.getList(index);
    }

    eventHandlerSwipedLeft = (eventData) => {
        //this.props.onSwipedLeft();
        this.showDataChart();
    }

    eventHandlerSwipedRight = (eventData) => {
        //this.props.onSwipedRight();
        this.getNewDataChart();
    }

    render() {
        var stepShow = 7;
        var { classes } = this.props;
        var { filter, data, dataOfWeek, labels, labelsOfWeek, number_price, numberOfTrip, index, backgroundColor } = this.state;

        console.log("xxx", labelsOfWeek, labels)

        var showLabelsWeek = labelsOfWeek.slice(labelsOfWeek.length - (index * stepShow + 7), labelsOfWeek.length - index * stepShow);
        var showLablesOther;
        if (filter === "week") {
            showLablesOther = labels.slice(labelsOfWeek.length - (index * stepShow + 7), labelsOfWeek.length - index * stepShow);
        } else {
            showLablesOther = labels.slice(index * stepShow, index * stepShow + 7);

        }
        var showData = (filter === "week") ?
            dataOfWeek.slice(dataOfWeek.length - (index * stepShow + 7), dataOfWeek.length - index * stepShow) :
            data.slice(index * stepShow, index * stepShow + 7);
        console.log("xxx", showLabelsWeek, showLablesOther);
        var self = this;
        var dataChart = {
            labels: filter === "week" ? showLabelsWeek : showLablesOther,
            datasets: [{
                label: 'Thu nhập',
                data: showData,
                pointBackgroundColor: [backgroundColor],
                backgroundColor: backgroundColor,
                borderColor: '#707070',
                borderWidth: 1
            }]
        }

        var options = {
            events: ['click'],
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        callback: function (label, index, labels) {
                            if(label  >= 1000 && label < 1000000)
                                return Math.round(label / 1000)  + " K";
                            if(label === 0){
                                return 0
                            }

                            if(label > 0 && label < 1000)
                                return label
                           
                            return Math.round(label / 1000000) + " M"
                        }
                    },

                }],
                xAxes: [{
                    maxTicksLimit: 10,
                    offset: true,
                    type: filter == 'week' ? 'category' : 'time',
                    distribution: 'linear',
                    unitStepSize: 1,
                    time: {
                        unit: filter,
                        unitStepSize: 1,
                        displayFormats: {
                            day: 'DD/MM',
                            week: 'ww',
                            month: 'MM/YYYY',
                            year: 'YYYY'
                        }
                    },
                    ticks: {
                        stepSize: 1,
                        autoSkip: false
                    },
                    stacked: true,
                    gridLines: {
                        display: false
                    },
                }
                ]
            },
            tooltips: {
                callbacks: {
                    title: function (tooltipItem) {
                        return self.convertDateString(showLabelsWeek[tooltipItem[0].index], showLablesOther[tooltipItem[0].index]);
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
        };
        return (
            <Swipeable
                onSwipedLeft={(eventData) => this.eventHandlerSwipedLeft(eventData)}
                onSwipedRight={(eventData) => this.eventHandlerSwipedRight(eventData)}
            >

                <div style={{ paddingRight: "10px", textAlign: "center"}}>
                    <Bar data={dataChart} options={options}
                        style={{width: "100px", height: "200px"}}
                        height={this.state.chartHeight}     
                        onElementsClick={element => {
                            console.log("E", element);
                            if (element.length !== 0) {
                                let index = element[0]._index;
                                this.onElementsClick(index);
                            }
                        }}
                    />
                </div>

                <div style={{ position: "absolute", width: "100%", marginTop: "-34px" }}>
                    <div style={{ display: "block", float: "left", marginLeft: "10px" }}>
                        <IconButton
                            onClick={(e) => {
                                this.eventHandlerSwipedRight(e)
                            }}
                            color="warningNoBackground"
                            customClass="edit">
                            <KeyboardArrowLeft />
                        </IconButton>
                    </div>

                    <div style={{ display: "block", float: "right", marginRight: "20px"}}>
                        <IconButton
                            onClick={(e) => {
                                this.eventHandlerSwipedLeft(e)
                            }}
                            color="warningNoBackground"
                            customClass="edit">
                            <KeyboardArrowRight />
                        </IconButton>
                    </div>

                </div>
                <div style={{ fontSize: "14px", fontWeight: "400", marginTop: "10px", textAlign: "center" }}>
                    <span>Click vào cột để hiển thị</span>
                </div>
            </Swipeable>
        )
    }



}
export default Chart;