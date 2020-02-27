import { sessionService } from 'redux-react-session';
import * as sessionApi from '../api/sessionApi';
import axios from "axios";
import {host} from "config/host";
import {API} from "config/Constant.js";

export const login = (user, history) => {
  console.log("User login", user);
  return () => {
    return axios.post(host.concat(API.LOGIN), user)
    .then(function (res) {
        const token = res.data.data.token;
        console.log("REs", res.data);
        if(res.data.code === 200){
          sessionService.saveSession({ token })
          .then(() => {
            history.push('/home');
          }).catch(err => console.error(err));
        } else {
          alert("Mật khẩu không chính xác")
        }

    })
    .catch(function (err) {
      alert(err.response.data.message)
    });
  };
};

export const logout = (history) => {
  return () => {
    return sessionApi.logout().then(() => {
      sessionService.deleteSession();
      sessionService.deleteUser();
      history.push('/login');
    }).catch(err => {
      throw (err);
    });
  };
};
