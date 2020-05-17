// base home screen for user logined
import React from "react";
import ReactPlayer from 'react-player'
class LoginScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }

  componentDidMount(){

  }

  componentWillMount(){

  }

  render(){
    return (
      <div>
        <ReactPlayer url='http://107.113.194.132:3000/video' playing={true} />
        <span>LoginScreen</span>
        <button
          onClick={() => this.props.history.push('/home')}
        >Login</button>
      </div>
    )
  }

}

export default LoginScreen;