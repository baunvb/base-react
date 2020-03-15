import React from 'react';
import 'components/Alert/whaleloalert.css';
const TYPE = {
  SUCCESS: 'success',
  FALSE: 'false',
  WARNING: 'warning'
}
class CommonAlert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      content: null,
      type: TYPE.SUCCESS
    }

  }
  updateState = (key, value) => {
    this.setState({
      [key]: value
    })
  }

  componentDidMount() {

  }

  show = (type) => {
    this.setState({
      show: true,
      type:type
    })
  }

  hide = () => {
    this.setState({
      show: false
    })
  }

  render() {
    const { children, confirmText} = this.props;
    const { show, content, type } = this.state;
    var header = '';
    switch(type){
      case TYPE.SUCCESS:
          header = "Success";
          break;
      case TYPE.WARNING:
          header = "Warning";
          break;
      default:
          header = "Err";
          break;
    }
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

CommonAlert.defaultProps = {
  header: "Warning",
  confirmText: "OK",
}

export default CommonAlert