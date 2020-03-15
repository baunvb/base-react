import React from 'react';
import 'views/Profile/profile.css';
import DefaultAvatar from '../../assets/img/wlicon/avatar.png'
import AvatarBorder from 'assets/img/wlicon/avatar_border.png'
import SettingIcon from 'assets/img/wlicon/setting.svg'
import IconPass from 'assets/img/wlicon/icon_password.svg'
import * as requestApi from 'api/requestApi';
import { sessionService } from 'redux-react-session';
import WhaleloAlert from 'components/Alert/WhaleloAlert.jsx'
import WhaleloInput from 'components/CustomInput/WhaleloInput.jsx'
import InputPassword from 'views/Profile/InputPassword.jsx'
import { API, COOKIE_KEY } from 'config/Constant.js'
import { connect } from 'react-redux'
import { USER_ACTION } from 'actions/UserActions.js'
import Resizer from 'react-image-file-resizer';
import IconCamera from 'assets/img/wlicon/icon_camera.png';
import { BASE_URL_IMG } from 'config/host'
import CommonAlert from 'components/Alert/CommonAlert.jsx'

class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            err: null,
            isSelectAble: false
        }

    }

    openAlertEditProfile = () => {
        this.alertEditProfile.show()
    }

    openAlertChangePass = () => {
        this.alertChangePass.show()
    }

    onConfirmUpdatePassword = () => {
        this.onUpdatePassword()
    }

    onConfirmUpdateProfile = () => {
        this.alertEditProfile.hide()
        this.onUpdateProfile()
    }

    checkValidPass = (pass) => {
        if(pass === undefined) {
            return false;
        }
        if (pass.length < 6 || pass === undefined || pass === null){
            return false;
        }
        return true;
    }

    onUpdatePassword = () => {
        const { old_password, new_password, confirm_new_password } = this.state;
        if (!this.checkValidPass(old_password) || !this.checkValidPass(new_password) || !this.checkValidPass(confirm_new_password)) {
            this.setState({
                err: <span className="text-invalid">Password at least 6 characters</span>
            })
        } else if (new_password !== confirm_new_password) {
            this.setState({
                err: <span className="text-invalid">New password does not match</span>
            })
        } else {
            this.alertEditProfile.hide()
            this.setState({
                err: null
            })
            requestApi.postByToken(API.CHANGE_PASSWORD, { old_password: old_password, new_password: new_password }, (res) => {
                if (res.code === 200) {
                    this.CommonAlert.updateState("content", <span>Update password successfully!</span>);
                    this.CommonAlert.show('success');
                } else {
                    this.CommonAlert.updateState("content", <span>Occurs an error when update password. Please try again!</span>);
                    this.CommonAlert.show('warning');
                }
            })
        }

    }

    onUpdateProfile = () => {
        const { edit_name, edit_phoneNumber } = this.state;
        requestApi.postByToken(API.UPDATE_INFO, { name: edit_name, phone_number: edit_phoneNumber }, (res) => {
            if (res.code === 200) {
                this.CommonAlert.updateState("content", <span>Update profile successfully!</span>);
                this.CommonAlert.show('success');
            } else {
                this.CommonAlert.updateState("content", <span>Occurs an error when update profile. Please try again!</span>);
                this.CommonAlert.show('warning');
            }
        })

    }


    onCancel = () => {
        this.alertEditProfile.hide();
        this.alertChangePass.hide();
    }

    logout = async () => {
        sessionService.deleteSession();
        document.cookie = `${COOKIE_KEY.TOKEN}=`;
        this.props.history.push('/login')
    }

    componentDidMount() {
        console.log("componentDidMount", this.props.profile)

    }

    componentDidUpdate(prevProp, prevState) {
        if (prevProp.profile !== this.props.profile) {
            this.setState({
                edit_name: this.props.profile.name,
                edit_phoneNumber: this.props.profile.phone_number
            })
        }
    }

    onInputPassword = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onInput = (e) => {
        const { value, name } = e.target;
        this.setState({
            [name]: value
        });
    }

    onHoverAvatar = (e) => {
        this.setState({
            isSelectAble: true
        })
    }

    onSelectAvatar = (e) => {
        var file = e.target.files[0];
        Resizer.imageFileResizer(
            file,
            500,
            500,
            'JPEG',
            80,
            0,
            uri => {
                requestApi.postByToken(API.UPDATE_AVATAR, { avatar: uri }, (res) => {
                    console.log("UPDATE_AVATAR", res.data.avatar)
                    if (res.code === 200) {
                        var imgUrl = res.data.avatar;
                        this.props.updateState(USER_ACTION.UPDATE_AVATAR, imgUrl)

                    }
                })
            },
            'base64'
        );
        let reader = new FileReader();
        reader.onloadend = () => {

            //request update avatar
            this.setState((prevState) => ({
                avatar: reader.result
            }));
        };
        reader.readAsDataURL(file);
    }

    render() {
        return (
            <div className="main-profile">
                <CommonAlert
                    ref={instance => this.CommonAlert = instance}
                />
                <WhaleloAlert
                    ref={instance => this.alertEditProfile = instance}
                    header="Edit profile"
                    confirmText="Accept"
                    cancelText="Cancel"
                    onCacel={this.onCancel}
                    onConfirm={this.onConfirmUpdateProfile}
                >
                    <WhaleloInput
                        name="edit_name"
                        label="Full name"
                        value={this.state.edit_name}
                        onChange={this.onInput}
                    />
                    <WhaleloInput
                        name="edit_phoneNumber"
                        label="Phone number"
                        value={this.state.edit_phoneNumber}
                        onChange={this.onInput}

                    />
                </WhaleloAlert>

                <WhaleloAlert
                    ref={instance => this.alertChangePass = instance}
                    header="Change password"
                    confirmText="Accept"
                    cancelText="Cancel"
                    onCacel={this.onCancel}
                    onConfirm={this.onConfirmUpdatePassword}
                >
                    <span className="label-setting">Password</span>
                    <InputPassword
                        name="old_password"
                        onChange={this.onInputPassword}
                    />
                    <span className="label-setting">New password</span>
                    <InputPassword name="new_password"
                        onChange={this.onInputPassword}
                    />
                    <span className="label-setting">Confirm new password</span>
                    <InputPassword name="confirm_new_password"
                        onChange={this.onInputPassword}
                    />
                    {this.state.err}
                </WhaleloAlert>

                <div className="top-info">
                    <div>
                        <img className="img-avatar" src={BASE_URL_IMG + this.props.profile.avatar} onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = DefaultAvatar
                        }} />
                        <img className="avatar-border" src={AvatarBorder} />
                        {
                            this.state.isSelectAble && <img className="icon-camera" src={IconCamera} />
                        }
                        <input placeholder="Update avatar" className="input-update-avatar" type="file" accept="image/*"
                            onChange={e => this.onSelectAvatar(e)}
                            onMouseOver={e => this.onHoverAvatar(e)}
                            onMouseLeave={e => {
                                this.setState({
                                    isSelectAble: false
                                })
                            }}
                        ></input>

                    </div>
                    <span className="username">{this.props.profile.name}</span>
                    <span className="email">{this.props.profile.email}</span>
                </div>
                <hr />

                <div className="wrap-setting">
                    <span className="title-setting">Account setting</span>
                    <div className="profile-edit"
                        onClick={e => this.openAlertEditProfile()}
                    >
                        <span className="label-setting">Edit profile</span>
                        <img className="icon-setting" src={SettingIcon} />
                    </div>

                    <div className="profile-edit"
                        onClick={e => this.openAlertChangePass()}
                    >
                        <span className="label-setting">Change password</span>
                        <img className="icon-setting" src={IconPass} />
                    </div>

                    <div className="profile-edit" onClick={(e) => this.logout()}>
                        <span className="logout">Logout</span>
                    </div>

                </div>
            </div>
        )
    }

}

const mapDispatchToProps = dispatch => {
    return {
        updateState: (type, data) => dispatch({ type, data })
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        profile: state.user.user,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)