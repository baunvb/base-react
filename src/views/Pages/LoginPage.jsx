import React, { Component } from 'react';
import * as requestApi from 'api/requestApi';
import { sessionService } from "redux-react-session";

import { validateEmail , setCookie} from "common/function.jsx";
import "./login.css";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as sessionActions from 'actions/sessionActions';
import PropTypes from "prop-types";
import { withRouter } from 'react-router-dom';
import logo from 'assets/img/wlicon/whalelo.png'
import iconShowPass from 'assets/img/wlicon/icon_show_pass.png'
import axios from "axios";
import { host } from "config/host";
// material-ui components
import withStyles from "material-ui/styles/withStyles";
// material-ui-icon

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import ItemGrid from "components/Grid/ItemGrid.jsx";

import loginPageStyle from "assets/jss/views/loginPageStyle.jsx";

import JssProvider from 'react-jss/lib/JssProvider';
import { createGenerateClassName } from '@material-ui/core/styles';
import { API, COOKIE_KEY } from 'config/Constant.js'

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
                // tokenFirebase: '123abcdefg0987'
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

    }

    componentDidMount() {

    }

    async onSubmit(history) {
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
            // const { login } = this.props.actions;
            // login(user, history);

            try {
                var responseLogin = await axios.post(`${host}${API.LOGIN}`, user);
                console.log("responseLogin", responseLogin);
                if (responseLogin.data.code === 200) {
                    const token = responseLogin.data.data.receptionist.token;
                    console.log("ON LOGIN", token)
                    await sessionService.saveSession({ token })
                    setCookie(COOKIE_KEY.TOKEN, token, 30);
                    //document.cookie = `${COOKIE_KEY.TOKEN}=${token}; max-age=${30 * 24 * 60 * 60 * 1000}`;
                    history.push('/home');
                }
            } catch (err) {
                console.log("responseLogin", err.response);
                if (err.response.data.code === 400) {
                    this.setState({
                        invalidEmailOrPassword: (<span className="text-invalid">Email or password is invalid </span>)
                    })
                }
            }

        }

    }

    onChange(e) {
        const { value, name } = e.target;
        const { user } = this.state;
        if(name === "email") {
            user[name] = value.toLowerCase();
        } else {
            user[name] = value;
        }
        
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

            <div className="center-page">
                {this.state.alert}
                <div className="center-login">
                    <div>
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

                                        {
                                            this.state.invalidEmailOrPassword
                                        }

                                        <LoginButton />

                                    </div>

                                </form>
                            </ItemGrid>
                            <span onClick={e => this.props.history.push("/forgetpassword")} className="forget-pass">Forget password?</span>

                        </GridContainer>
                    </div>
                </div>
            </div>

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
