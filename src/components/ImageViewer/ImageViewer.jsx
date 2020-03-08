import React from 'react';
import 'components/ImageViewer/imageviewer.css';
class ImageViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      src: null
    }
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({
        show: false
      })
    }
  }

  update = (key, value) => {
    this.setState({
      [key]: value
    })
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  render() {
    const {show} = this.state;
    return (
      show && <div className="over-image-viewer">
        <div className="content-image">
          <img ref={this.setWrapperRef} className="img" src={this.state.src}/>
        </div>
      </div>
    )
  }

}

ImageViewer.defaultProps = {
}

export default ImageViewer