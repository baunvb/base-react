import React from 'react'
import iconShowPass from 'assets/img/wlicon/icon_show_pass.png'

import 'views/Profile/inputpassword.css'
class InputPassword extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false
        }
    }

    onShowPass = () => {
        this.setState((prevState) => ({
            show: !prevState.show
        }))
    }

    render() {
        return (
            <div className="main">
                <input
                    type={this.state.show ? "text" : "password"}
                    className="input-pass"
                    name={this.props.name}
                    onChange={(e) => this.props.onChange(e)}
                >
                </input>
                {
                    <img className="icon-show-pass" src={iconShowPass} onClick={e => this.onShowPass()} />     
                }

            </div>
        )
    }
}

export default InputPassword