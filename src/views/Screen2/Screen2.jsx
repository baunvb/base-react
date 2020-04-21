import React from "react";
import "views/Screen2/screen2.css"
import {SAMPLE_ACTION} from "../../actions/SampleActions";
import { connect } from "react-redux"
class Screen2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 1
    }
  }

  handleChange = (event, newValue) => {
    this.setState({
      tabIndex: newValue
    })
  };




  componentDidMount() {

  }


  render() {

    return (
      <div className="wrap-tab"
        onClick={() => this.props.updateState(SAMPLE_ACTION.HELLO, "text updated by action")}
      >
        <button>Sample Reducer</button>
        {this.props.text}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    text: state.sample.text,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateState: (type, data) => dispatch({ type, data })
  }
}

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(Screen2);
