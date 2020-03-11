import React from 'react';
import './loading.css'
class Circle extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isShow: this.props.show
    }
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
    const { isShow } = this.state
   if (!isShow) return null

    return (
      <div className="wrap-loading">
        <div className="loading">
          <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
      </div>
    );
  }
}

Circle.defaultProps = {
  show: false
}

export default Circle;