import React from "react";
import "assets/css/custom-alert.css";

export default class CustomAlert extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { content, display, showBtnCancel, title, textAlign } = this.props
        return (
            <div style={{ display: display ? "block" : "none" }} className="dimAlert" >
                <div className="wrapUpdateTime alertScale">
                    <div className="alertStyle">
                        {title}
                        <div style={{textAlign: textAlign}}>
                            {content}
                        </div>
                        
                        <div className="btn-wraper">
                            {
                                showBtnCancel ?  <button className="cancelBtnStyle" onClick={this.props.onCancelClick}>Hủy</button> : null
                            }
                            <button className="confirmBtnStyle" onClick={this.props.onConfirmClick}>Xác nhận</button>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}