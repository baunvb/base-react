import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

class SnackbarCustom extends React.Component {
  state = {
    open: false,
  };

  handleClick = () => {
    this.setState({ open: true});
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  updateMessage = (message) => {
      this.setState({
          message: message
      })
      this.handleClick();
  }

  render() {
    return (
      <div>
        <Snackbar
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={TransitionUp}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.state.message}</span>}
        />
      </div>
    );
  }
}

export default SnackbarCustom;