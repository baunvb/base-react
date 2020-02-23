import React from "react";
import { vndStyle } from "common/function.jsx"
import JssProvider from 'react-jss/lib/JssProvider';
import { createGenerateClassName } from '@material-ui/core/styles';

var type = 'Bar'

const generateClassName = createGenerateClassName({
    //dangerouslyUseGlobalCSS: true,
    productionPrefix: 'pricecontent',
});
const vnd = ' vnđ';
const chuyenxe = ' chuyến xe';
const root = {
    main: { marginTop: "10px", marginBottom: "10px", paddingRight: "20px", paddingLeft: "20px" },
    topLabel: {
        position: "absolute",
        top: "10px"
    },

    bottomLabel: {
        position: "absolute",
        bottom: "10px"
    },
    label: {
        color: "#ffffff",
        fontSize: "16px",
        fontWeight: "normal",
    },
    value: {
        color: "#ffffff",
        fontSize: "20px",
        fontWeight: "600",
    },
    donvi: {
        color: "#ffffff",
        fontSize: "14px",
        fontWeight: "normal",
    },
    labelDate: {
        color: "#000000",
        fontSize: "14px",
        fontWeight: "500",
    },
    priceContent: {
        marginTop: "10px",
    },
    price: {
        color: "#FF7900",
        fontSize: "25px",
        fontWeight: "700"
    },
    chuyenxe: {
        color: "#000000",
        fontSize: "20px",
        fontWeight: "500"
    },
    date: {
        fontSize: "16px",
        color: "#00b1ff",
    },
    wrapDate: {
        marginTop: "20px",
        marginBottom: "20px"
    },
    cardPrice: {
        float: "left",
        display: "inline-block",
        position: "relative",
        width: "calc(50% - 10px)",
        maxWidth: "200px",
        height: "80px",
        borderRadius: "20px",
        background: "#38b0d5",
        padding: "0 20px"
    },
    cardChuyenxe: {
        float: "right",
        display: "inline-block",
        position: "relative",
        height: "80px",
        width: "calc(50% - 10px)",
        maxWidth: "200px",
        borderRadius: "20px",
        background: "#89bd4e",
        padding: "0px 20px"
    }
}
export default class PriceContent extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: this.props.currentDate,
            price: this.props.price,
            chuyenxe: this.props.chuyenxe,
            justify: "center",

        }
    }

    componentWillMount() {
        var width = window.innerWidth
        if (width >= 768) {
            this.setState({
                justify: "left"
            })
        }
    }

    updateStatePrice = (key, value) => {
        this.setState({
            [key]: value
        })
    }

    render() {
        var price = vndStyle(this.state.price);
        return (
            <JssProvider generateClassName={generateClassName}>
                <div style={root.main}>
                    <div  style={root.wrapDate}>
                        <span>
                            <span style={root.labelDate}>Chi tiết </span>
                            <span style={root.date}>({this.state.currentDate})</span>
                        </span>
                    </div>

                    <div style={{ display: "inline-block", clear: "both", width: "100%", maxWidth: "400px", textAlign: this.state.justify }}>
                        <div style={root.cardPrice}>
                            <div style={root.topLabel}>
                                <span style={root.label}>Tổng doanh thu </span> <br></br>
                            </div>
                            <div style={root.bottomLabel}>

                                <span style={root.value}>{price} </span>
                                <span style={root.donvi}> vnđ</span>
                            </div>
                        </div>
                        <div style={root.cardChuyenxe}>
                            <div style={root.topLabel}>
                                <span style={root.label}>Tổng chuyến xe </span> <br></br>
                            </div>
                            <div style={root.bottomLabel}>
                                <span style={root.value}>{this.state.chuyenxe} </span>
                                <span style={root.donvi}> chuyến</span>
                            </div>
                        </div>
                    </div>
                </div>
            </JssProvider>
        )
    }
}

