import React from "react";
import { vndStyle } from "common/function.jsx"
import JssProvider from 'react-jss/lib/JssProvider';
import { createGenerateClassName } from '@material-ui/core/styles';


const generateClassName = createGenerateClassName({
    //dangerouslyUseGlobalCSS: true,
    productionPrefix: 'pricecontent',
});
const root = {
    main: { marginTop: "50px", marginBottom: "10px", paddingRight: "20px", paddingLeft: "20px" },
    topLabel: {
        position: "absolute",
        top: "10px"
    },

    bottomLabel: {
        position: "absolute",
        bottom: "10px"
    },
    label: {
        color: "#8C8C8C",
        fontSize: "16px",
        fontWeight: "normal",
    },
    value: {
        color: "#009CDC",
        fontSize: "20px",
        fontWeight: "600",
    },
    donvi: {
        color: "#009CDC",
        fontSize: "14px",
        fontWeight: "normal",
    },
    labelDate: {
        color: "#8C8C8C",
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
        borderRadius: "4px",
        padding: "0 20px",
        border: "1px solid #3B4EDC"
    },
    cardChuyenxe: {
        float: "right",
        display: "inline-block",
        position: "relative",
        border: "1px solid #3B4EDC",
        height: "80px",
        width: "calc(50% - 10px)",
        maxWidth: "200px",
        borderRadius: "4px",
        padding: "0px 20px"
    }
}
export default class PriceContent extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: "01/01/2020",
            price: 1000000,
            chuyenxe: 25,
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
        const {datapoint} = this.props
        var price = vndStyle(datapoint.price);
        return (
            <JssProvider generateClassName={generateClassName}>
                <div style={root.main}>
                    <div  style={root.wrapDate}>
                        <span>
                            <span style={root.labelDate}>Detail: </span>
                            <span style={root.date}>{datapoint.label}</span>
                        </span>
                    </div>

                    <div style={{ display: "inline-block", clear: "both", width: "100%", maxWidth: "400px", textAlign: this.state.justify }}>
                        <div style={root.cardPrice}>
                            <div style={root.topLabel}>
                                <span style={root.label}>Total Income: </span> <br></br>
                            </div>
                            <div style={root.bottomLabel}>

                                <span style={root.value}>{price} </span>
                                <span style={root.donvi}> vnđ</span>
                            </div>
                        </div>
                        <div style={root.cardChuyenxe}>
                            <div style={root.topLabel}>
                                <span style={root.label}>Total Bookings </span> <br></br>
                            </div>
                            <div style={root.bottomLabel}>
                                <span style={root.value}>{datapoint.booking} </span>
                                <span style={root.donvi}> Booking(s)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </JssProvider>
        )
    }
}

