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
        console.log(old_password, new_password, confirm_new_password);

    }

    onUpdateProfile = () => {
        const { edit_name, edit_phoneNumber } = this.state;
        console.log(edit_name, edit_phoneNumber)
        requestApi.postByToken(API.UPDATE_INFO, {name: edit_name, phone_number: edit_phoneNumber}, (res) => {
            console.log(API.UPDATE_INFO, res)
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
        sessionService.loadUser().then(user => {
            console.log("loadUser", user)
            this.setState({
                profile: user.user.station,
                edit_name: user.user.station.name,
                edit_phoneNumber: user.user.station.phone_number
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
                    header="Edit profile"
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