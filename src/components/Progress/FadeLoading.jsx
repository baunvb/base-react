import React from "react";
import "assets/scss/fadeloading.scss"

class FadeLoading extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="dim">
        <div className="loader">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    )
  }
}

export default FadeLoading;