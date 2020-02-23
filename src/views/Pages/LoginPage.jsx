import React, { Component } from 'react';
import * as requestApi from 'api/requestApi';
import {validateEmail} from "common/function.jsx";
import "./login.css";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as sessionActions from 'actions/sessionActions';
import PropTypes from "prop-types";
import { withRouter } from 'react-router-dom';
import CustomAlert from "components/Alert/CustomAlert.jsx"
import logo from 'assets/img/wlicon/whalelo.png'
import iconShowPass from 'assets/img/wlicon/icon_show_pass.png'

// material-ui components
import withStyles from "material-ui/styles/withStyles";
import TextField from '@material-ui/core/TextField';
// material-ui-icon

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import ItemGrid from "components/Grid/ItemGrid.jsx";

import loginPageStyle from "assets/jss/views/loginPageStyle.jsx";

import JssProvider from 'react-jss/lib/JssProvider';
import { createGenerateClassName } from '@material-ui/core/styles';

const generateClassName = createGenerateClassName({
    dangerouslyUseGlobalCSS: true,
    productionPrefix: 'c',
});

class LoginPage extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            user: {
                email: '',
                password: '',
                tokenFirebase: '123abcdefg0987'
            },
            invalidEmail: null,
            invalidPassword: null,
            alert: null,
            isShowPassword: false
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    componentWillMount() {
        requestApi.postByToken("checkToken", {}, (res) => {
            console.log("XXX", res);
            if (res.message) {
                this.props.history.push("/home");
            }
        })
    }
    componentDidMount() {
       
    }

    onSubmit(history) {
        const { user } = this.state;
        var isEmailValidate = validateEmail(user.email);
        if (!isEmailValidate) {
            this.setState({
                invalidEmail: (<span className="text-invalid">Email is invalid </span>)
            })
        } else {
            this.setState({
                invalidEmail: null
            })
            const { login } = this.props.actions;
            login(user, history);
        }

    }

    onChange(e) {
        const { value, name } = e.target;
        const { user } = this.state;
        user[name] = value;
        this.setState({ user });
    }

    handleClickOpen = (name) => {
        this.setState({ [name]: true })
    };

    handleClose = () => {
        this.setState({ open: false })
    };


    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    destroyAlert = () => {
        this.setState({
            alert: null,
        })
    }

    handleForgetPassword = () => {
        console.log(this.state.editEmail);
        var self = this;
        requestApi.postRequest("salepoints/forgetPassword", { email: self.state.editEmail }, (res) => {
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
        const { isShowPassword, user } = this.state;
        //const { user: { email, password } } = this.state;<button className="btn-login">Login</button>
        const LoginButton = withRouter(({ history }) => (
            <button className="btn-login" onClick={() => this.onSubmit(history)} type="submit">
                Login
            </button>
        ));
        return (

            <JssProvider generateClassName={generateClassName}>
                <div className={classes.content}>
                    {this.state.alert}
                    <div classes="center-login" className={classes.container}>
                        <GridContainer justify="center">
                            <ItemGrid xs={12} sm={6} md={4}>
                                <div className="wrap-img-login">
                                    <img alt="" src={logo} />
                                </div>
                                <form action="javascript:void(0);">

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
                                        <span className="lable-input">Password </span>
                                        <div className="wrap-input">
                                            <input
                                                type={isShowPassword ? "text" : "password"}
                                                className="input-login"
                                                name="password"
                                                onChange={(e) => this.onChange(e)}
                                            >
                                            </input>
                                            {
                                                user.password.length > 0 ?
                                                    <img className="icon-show-pass" src={iconShowPass} onClick={e => this.onShowPass()} />
                                                    : null
                                            }

                                        </div>
                                        <LoginButton />

                                    </div>

                                </form>
                            </ItemGrid>
                            <span onClick={e => this.props.history.push("/forgetpassword")} className="forget-pass">Forget password?</span>

                        </GridContainer>
                    </div>
                </div>
            </JssProvider>

        );

    }
}

const mapDispatch = (dispatch) => {
    return {
        actions: bindActionCreators(sessionActions, dispatch)
    };
};

LoginPage.propTypes = {
    classes: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};

export default connect(null, mapDispatch)(withStyles(loginPageStyle)(LoginPage));
