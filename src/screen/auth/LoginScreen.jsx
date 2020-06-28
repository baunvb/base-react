// base home screen for user logined
import React from "react";
class LoginScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }

  componentDidMount(){
    console.log("LOGINNNNNNNNNNNNNNNNNNNN")
  }



  render(){
    return (
      <div>
        <span>LoginScreen</span>
        <button
          onClick={() => this.props.history.push('/home')}
        >Login</button>
      </div>
    )
  }

}

export default LoginScreen;