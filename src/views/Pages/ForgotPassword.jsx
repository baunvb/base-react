import React, { Component } from 'react';
import * as requestApi from 'api/requestApi';
import "./login.css";
import { validateEmail } from "common/function.jsx";

import PropTypes from "prop-types";
import CustomAlert from "components/Alert/CustomAlert.jsx"
import logo from 'assets/img/wlicon/whalelo.png'
import loginPageStyle from "assets/jss/views/loginPageStyle.jsx";

// material-ui components
import withStyles from "material-ui/styles/withStyles";
import TextField from '@material-ui/core/TextField';
// material-ui-icon

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import ItemGrid from "components/Grid/ItemGrid.jsx";


import JssProvider from 'react-jss/lib/JssProvider';
import { createGenerateClassName } from '@material-ui/core/styles';

const generateClassName = createGenerateClassName({
    dangerouslyUseGlobalCSS: true,
    productionPrefix: 'c',
});

class ForgotPassword extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            email: '',
            invalidEmail: null,
            alert: null,
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit(history) {
        const { email } = this.state;
        var isEmailValidate = validateEmail(email);
        if (!isEmailValidate) {
            this.setState({
                invalidEmail: (<span className="text-invalid">Email is invalid </span>)
            })
        } else {
            this.setState({
                invalidEmail: null
            });
            this.handleForgetPassword();
        }

    }

    onChange(e) {
        const { value, name } = e.target;
        this.setState({
            [name]: value
        });
    }


    destroyAlert = () => {
        this.setState({
            alert: null,
        })
    }

    handleForgetPassword = () => {
        console.log(this.state.email);
        var self = this;
        requestApi.postRequest("salepoints/forgetPassword", { email: this.state.email }, (res) => {
            console.log("res", res)
            self.handleClose();

            if (res.message === true) {
                //alert("Update password success, please check email");
                this.setState({
                    alert: <CustomAlert
                        display={true}
                        textAlign="center"
                        onConfirmClick={e => this.destroyAlert()}
                        title={null}
                        content={
                            <span><strong>Thay đổi mật khẩu không thành công. <br /></strong>Mật khẩu mới đã được gửi về email của bạn!</span>
                        }
                    />
                })
            } else {
                this.setState({
                    alert: <CustomAlert
                        display={true}
                        textAlign="center"
                        onConfirmClick={e => this.destroyAlert()}
                        title={null}
                        content={
                            <span>Thay đổi mật khẩu không thành công. <br /> Vui lòng thử lại!</span>
                        }
                    />
                })
            }
        })
    }


    onShowPass = () => {
        this.setState((prevState) => ({
            isShowPassword: !prevState.isShowPassword
        }))
    }

    render() {
        const { classes } = this.props;

        return (

            <div className="center-page">

                {this.state.alert}
                <div className="center-login">
                    <GridContainer justify="center">
                        <ItemGrid xs={12} sm={6} md={4}>
                            <div className="wrap-img-login">
                                <img alt="loại xe" src={logo} />
                            </div>
                            <div className="wrap-form-login">
                                <span className="lable-input">Email</span>
                                <div>
                                    <input
                                        type="text"
                                        className="input-login"
                                        name="email"
                                        onChange={(e) => this.onChange(e)}
                                    >
                                    </input>
                                    {this.state.invalidEmail}
                                </div>
                                <span className="lable-note">*New password will be sent to you email </span>
                                <button className="btn-login" onClick={() => this.onSubmit()} type="submit">
                                    Get password
                                        </button>

                            </div>

                        </ItemGrid>
                    </GridContainer>
                </div>

            </div>

        );

    }
}


ForgotPassword.propTypes = {
    classes: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};

export default withStyles(loginPageStyle)(ForgotPassword);
