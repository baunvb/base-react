import axios from "axios";

import {host} from "config/host";

export const registerUser = (user, fn) => {
    axios.post(host.concat('admin/register'), user)
        .then((res) => {
            fn(res.data)
        })
        .catch((err) => console.log(err));
}
export const forgotPassword = (email, fn) => {
    axios.post(host.concat('admin/forgetpassword'), email)
        .then((res) => {
            fn(res.data)
        })
        .catch((err) => console.log(err));
}