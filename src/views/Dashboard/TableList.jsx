import React from "react";
import * as requestApi from 'api/requestApi';
import { vndStyle, normalizeDate } from "common/function.jsx"
import ReactTable from "react-table";
import { config } from 'views/Dashboard/TimelineJsonConfig.jsx';
import sedan from 'assets/img/vehicle/sedan.png'
import suv from 'assets/img/vehicle/suv.png'
import minivan from 'assets/img/vehicle/minivan.png'

const style = {
    subData: {
        margin: "10px 10px",
        padding: "8px",
        borderRadius: "10px",
        background: "#f9f9f9"
    },
    email: {
        overflow: "hidden",
        display: "inline-block",
        width: "100%",
        textOverflow: "ellipsis",
        color: "#000000",
        lineHeight: "1.21",
        fontStyle: "normal",
        fontWeight: "500"
    },
    from: {
        color: "#bbbbbb"
    },
    price: {
        color: "#FF7900",
        fontSize: "18px",
        lineHeight: "1.21",
        fontWeight: "500"
    },
    circle: {
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        background: "#000000",
        position: "relative",
    },
    image: {
        width: "100%",
        height: "auto",
        margin: 0,
        padding: "4px",
        position: "absolute",
        top: "50%",
        msTransform: "translateY(-50%)",
        transform: "translateY(-50%)",
        padding: "4px"
    },
    tableDetail: {
        background: "#f9f9f9",
        borderCollapse: "collapse",
        height: "auto",
        padding: "5px",
        width: "100%,",
        animation: "float 5s infinite"
    },
    trDetail: {
        borderBottom: "1px solid #FFFFFF",
        color: "#666B85",
        fontSize: "16px",
        fontWeight: "normal"
    },
    tdDetail: {
        padding: "5px",
        width: "30%",
        textAlign: "left",
        verticalAlign: "middle",
        fontWeight: "300",
        fontSize: "14px"
    },
    tdDetail2: {
        padding: "5px",
        width: "70%",
        textAlign: "right",
        verticalAlign: "middle",
        fontWeight: "300",
        fontSize: "14px"
    }

}

export default class TableList extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            loading: false,
            length: props.length,
            filter: props.filter,
            display: "none",
            expanded: {},
            start: "",
            end: "",
            serial: 999999999,
            showmore: "none",
            chuyenxe: props.chuyenxe
        }
    }

    updateStateTable(key, value) {
        this.setState({
            [key]: value
        })
    }

    getListTrip = (label) => {
        var {loading} = this.state;
        if(loading) return;
        this.setState({
            loading: true,
            serial: 999999999,
        })
        const pos_start = " 00:00 am";
        const pos_end = " 11:59 pm";
        var start, end; // mm/dd/yyyy
        const { filter } = this.state
        if (filter == 'day') {
            start = label;
            end = label;
        }
        if (filter == 'week') {
            var arr = label.split("/");
            var curr = new Date(arr[2], arr[0] - 1, arr[1]);
            var first = curr.getDate() - curr.getDay() + 1;
            var increMM = (curr.getDate() - curr.getDay()) < 0 ? 1 : 0;
            var last = first + 6;
            var firstday = new Date(curr.setDate(first));
            var lastday = new Date(curr.setDate(last));

            start = firstday.getMonth() + 1 + '/' + firstday.getDate() + '/' + firstday.getFullYear();
            end = (lastday.getMonth() + 1 + increMM) + '/' + lastday.getDate() + '/' + lastday.getFullYear();
        }
        if (filter == 'month') {
            var split = label.split('/');
            var curr = new Date(split[2], split[0], 0);
            var lastday = curr.getDate();
            start = split[0] + "/01/" + split[2];
            end = split[0] + "/" + lastday + "/" + split[2];

        }
        if (filter == 'year') {
            start = label;
            end = "12/01/" + label.split('/')[2];
        }

        start = start + pos_start;
        end = end + pos_end;
        // this.setState((prevState, _) => ({
        //     start: start,
        //     end: end,
        //     list: []
        // }), () => this.fetchData())
    }

    fetchData = () => {
        var self = this;
        requestApi.postByToken('salepoints/getAllTripCompleteByTime', { time_begin: this.state.start, time_end: this.state.end, serial_before: this.state.serial }, (res) => {
            console.log("getAllTripCompleteByTime", res);
            var trips = res.data.trips;
            var length = res.data.trips.length;
            if (res.data.trips.length === 0) {
                self.setState((prevState, _prop) => ({
                    length: 0,
                    showmore: "none",
                    display: "none",
                    loading: !prevState.loading,
                }))
                return
            }
            self.setState((prevState, _prop) => ({
                serial: trips[length -1][config.Serial],
                list: [...prevState.list, ...trips.map((prop, key) => {
                    return ({
                        id: prop[config.Id_trip],
                        stt: key + 1,
                        email: prop[config.EmailGuest],
                        diemdon: prop[config.HomeName],
                        diemden: prop[config.NameArrive],
                        time: prop[config.TimeLeave],
                        price: prop[config.Price_host] + " VNĐ",
                        vehicle: prop[config.Vehicle_type],
                        subData: (
                            null
                            ),
                        column1: (
                            <div style={style.column1}>
                                <span style={style.email}>{prop[config.Name_customer]}</span> <br></br>
                                <span style={style.email}>
                                    <span style={style.from}>Từ </span>
                                    <span>{prop[config.HomeName]}</span>
                                </span>
                            </div>
                        ),
                        column2: (
                            <div>
                                <span>
                                    <span style={style.price}>{vndStyle(prop[config.Price_host])} vnđ</span>
                                </span>
                                <br></br>
                                <span>
                                    <span>{prop[config.TimeLeave]}</span>
                                </span>
                            </div>
                        ),
                        image: (
                            <div style={style.circle}>
                                <img style={style.image} alt="loại xe" src={prop[config.Vehicle_type] === "sedan" ? sedan : prop[config.Vehicle_type] === "suv" ? suv : minivan} />
                            </div>
                        )
                    })
                })]
            }))
            self.setState((prevState, _prop) => ({
                length: prevState.list.length,
                loading: !prevState.loading,
                showmore: prevState.list.length >= prevState.chuyenxe ? "none" : "block"
            }))
        })
    }

    onRowClick = (state, rowInfo) => {
        let currentExpanded = this.state.expanded;
        let index;
        for (var k in currentExpanded) {
            index = k
        }
        if (index == rowInfo.index) {
            this.setState({
                expanded: {}
            })
        } else {
            this.setState({
                expanded: { [rowInfo.index]: {} }
            })
        }
    }

    showMore = () => {
        var {loading} = this.state;
        if(loading) return;
        this.setState((prevState, _) => ({
            loading: !prevState.loading
        }))
        //this.fetchData();
    }

    render() {
        return (
            <div style={{ paddingLeft: "10px", marginTop: "15px", display: "block" }}>
                <ReactTable
                    data={this.state.list}
                    filterable
                    onExpandedChange={(newExpanded, index, event) => {
                        if (newExpanded[index[0]] === false) {
                            newExpanded = {}
                        } else {
                            const table = this.state.table;
                            Object.keys(newExpanded).map(k => {
                                newExpanded[k] = parseInt(k) === index[0] ? {} : false
                                return true;
                            })
                        }
                        this.setState((prevState, _) => ({
                            expanded: newExpanded
                        }));
                        return true;
                    }}
                    getTrProps={(state, rowInfo) => {
                        return {
                            onClick: (e) => this.onRowClick(state, rowInfo)
                        }
                    }}
                    expanded={this.state.expanded}
                    SubComponent={row => {
                        return (
                            row.original.subData
                        )
                    }}
                    noDataText={
                        this.state.loading ? null : (
                            <span>0 chuyến</span>
                        )
                    }
                    columns={[
                        {
                            accessor: "image",
                            width: 60,
                            Cell: row => <div style={{ textAlign: "left" }}>{row.value}</div>,
                            sortable: false,
                            filterable: false
                        },
                        {
                            accessor: "column1",
                            Cell: row => <div style={{ marginRight: "8px", textAlign: "left" }}>{row.value}</div>,
                            sortable: false,
                            filterable: false

                        },
                        {
                            accessor: "column2",
                            Cell: row => <div style={{ paddingRight: "8px", textAlign: "right" }}>{row.value}</div>,
                            sortable: false,
                            filterable: false

                        },
                        {
                            expander: true,
                            accessor: null,
                            width: 0,
                            show: false,
                        }
                    ]}
                    loading={this.state.loading}
                    pageSize={this.state.length}
                    defaultPageSize={5}
                    showPaginationBottom={false}
                    showPaginationTop={false}
                    className="-highlight"
                />
                <br />
                <div style={{ textAlign: "center", color: "#00b1ff", display: this.state.showmore }}>
                    <em
                        onClick={(e) => this.showMore()}
                    >
                        Xem thêm</em>
                </div>
            </div>
        )
    }
}
