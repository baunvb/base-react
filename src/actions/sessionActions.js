import { sessionService } from 'redux-react-session';
import * as sessionApi from '../api/sessionApi';
import axios from "axios";
import {host} from "config/host";

export const login = (user, history) => {
  console.log("User login", user);
  return () => {
    return axios.post(host.concat('salepoints/signin'), user)
    .then(function (res) {
        const token = res.data.data.token_id;
        const message = res.data.message;
        if(message === true){
          sessionService.saveSession({ token })
          .then(() => {
            sessionService.saveUser(res.data.data)
            .then(() => {
              history.push('/home');
            }).catch(err => console.error(err));
          }).catch(err => console.error(err));
        } else {
          alert("Mật khẩu không chính xác")
        }

    })
    .catch(function (error) {
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
