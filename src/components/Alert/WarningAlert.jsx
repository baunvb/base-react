import React from 'react';
import 'components/Alert/whaleloalert.css';
class WarningAlert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      content: null,
    }

  }
  updateState = (key, value) => {
    this.setState({
      [key]: value
    })
  }

  componentDidMount() {

  }

  show = () => {
    this.setState({
      show: true
    })
  }

  hide = () => {
    this.setState({
      show: false
    })
  }

  render() {
    const { children, header, confirmText} = this.props;
    const { show,content } = this.state;
    return (
      show && <div className="over-alert">
        <div className="whalelo-alert">
          <div className="header-alert">
            {header}
          </div>

          <div className="body-alert">
            <div className="alert-content">
              {content}
            </div>
            <button className="btn-login" onClick={() => {
              this.setState({
                show: false
              })
            }}>
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    )
  }

}

WarningAlert.defaultProps = {
  header: "Warning",
  confirmText: "OK"
}

export default WarningAlert