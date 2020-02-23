import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';

class Circle extends React.Component {
  state = {
    completed: 0,
    display: "none"
  };

  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  setHidden = (value) => {
    this.setState({
      display: value
    })
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
  };

  render() {
    const { classes } = this.props;
    return (
      <div style={
        { 
          display: this.state.display,
          justifyContent: 'center',
          alignItems: 'center',
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          background: "#494949",
          opacity: "0.6"

        }
      }>
        <CircularProgress
          variant="determinate"
          value={this.state.completed}
        />
      </div>
    );
  }
}

Circle.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default Circle;