import React from 'react';
import 'views/Profile/profile.css';
import DefaultAvatar from 'assets/img/wlicon/avatar.png'
import AvatarBorder from 'assets/img/wlicon/avatar_border.png'
import SettingIcon from 'assets/img/wlicon/setting.png'
import IconPass from 'assets/img/wlicon/icon_password.png'
import * as requestApi from 'api/requestApi';
import { sessionService } from 'redux-react-session';
import WhaleloAlert from 'components/Alert/WhaleloAlert.jsx'
import WhaleloInput from 'components/CustomInput/WhaleloInput.jsx'
import InputPassword from 'views/Profile/InputPassword.jsx'
import { API } from 'config/Constant.js'

class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            err: null,
            profile: {
                "email": "",
                "password": "",
                "name": "",
                "phone_number": "",
                "address": "",
            }
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
        this.onUpdateProfile()
    }

    onUpdatePassword = () => {
        const { old_password, new_password, confirm_new_password } = this.state;
        if (new_password !== confirm_new_password) {
            this.setState({
                err: <span className="text-invalid">New password isn't match</span>
            })
        } else {
            this.setState({
                err: null
            })
            requestApi.postByToken(API.CHANGE_PASSWORD, { old_password: old_password, new_password: new_password }, (res) => {
                if (res.code === 200) {
                    this.updatePassSuccess.show()
                } else {
                    this.updatePassFalse.show()
                }
            })
        }

    }

    onUpdateProfile = () => {
        const { edit_name, edit_phoneNumber } = this.state;
        console.log("XXXX", { ...this.state.user, name: edit_name })
        console.log(edit_name, edit_phoneNumber)
        requestApi.postByToken(API.UPDATE_INFO, { name: edit_name, phone_number: edit_phoneNumber }, (res) => {
            if (res.code === 200) {
                sessionService.saveUser({ user: { ...this.state.user, name: edit_name, phone_number: edit_phoneNumber } })
                    .then(() => {
                    }).catch(err => console.error(err));
                this.updateProfileSuccess.show()
            } else {
                this.updateProfileFalse.show()
            }
        })

    }


    onCancel = () => {
        this.alertEditProfile.hide();
        this.alertChangePass.hide();
    }

    logout = async () => {
        // await requestApi.postByToken("salepoints/signout", {}, (res) => { });
        sessionService.deleteSession();
        sessionService.deleteUser();
        this.props.history.push('/login')
    }

    componentDidMount() {
        sessionService.loadUser().then(value => {
            console.log("loadUser", value)
            this.setState({
                user: value.user,
                profile: value.user,
                edit_name: value.user.name,
                edit_phoneNumber: value.user.phone_number
            })
        })
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

    render() {
        return (
            <div className="main-profile">
                <WhaleloAlert
                    ref={instance => this.updatePassSuccess = instance}
                    header="Change password"
                    confirmText="OK"
                    showCancel={false}
                    onConfirm={() => { return }}
                >
                    <span>Update password successfully!</span>
                </WhaleloAlert>
                <WhaleloAlert
                    ref={instance => this.updatePassFalse = instance}
                    header="Change password"
                    confirmText="OK"
                    showCancel={false}
                    onConfirm={() => { return }}
                >
                    <span>Occurs an error when update password. Please try again!</span>
                </WhaleloAlert>
                <WhaleloAlert
                    ref={instance => this.updateProfileSuccess = instance}
                    header="Edit profile"
                    confirmText="OK"
                    showCancel={false}
                    onConfirm={() => { return }}
                >
                    <span>Update profile successfully!</span>
                </WhaleloAlert>
                <WhaleloAlert
                    ref={instance => this.updateProfileFalse = instance}
                    header="Edit profile"
                    confirmText="OK"
                    showCancel={false}
                    onConfirm={() => { return }}
                >
                    <span>Occurs an error when update profile. Please try again!</span>
                </WhaleloAlert>
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
                        <img className="img-avatar" src={DefaultAvatar} />
                        <img className="avatar-border" src={AvatarBorder} />
                    </div>
                    <span className="username">{this.state.profile.name}</span>
                    <span className="email">{this.state.profile.email}</span>
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

export default UserProfile