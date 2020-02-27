import React from 'react';
import 'components/Alert/whaleloalert.css';
class WhaleloAlert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false
    }

  }

  componentDidMount() {

  }

  show = () => {
    this.setState({
      isShow: true
    })
  }

  hide = () => {
    this.setState({
      isShow: false
    })
  }

  render() {
    const { confirmText, cancelText, children, header, onConfirm, onCacel, showCancel } = this.props;
    const { isShow } = this.state;
    return (
      isShow && <div className="over-alert">
        <div className="whalelo-alert">
          <div className="header-alert">
            {header}
          </div>

          <div className="body-alert">
            <div className="alert-content">
              {children}
            </div>

            {
              showCancel && <button className="btn-cancel" onClick={() => {
                this.hide()
                onCacel()
              }}>
                {cancelText}
              </button>
            }
            <button className="btn-login" onClick={() => {
              this.setState({
                isShow: false
              })
              onConfirm()
            }}>
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    )
  }

}
WhaleloAlert.defaultProps = {
  showCancel: true
}
export default WhaleloAlert