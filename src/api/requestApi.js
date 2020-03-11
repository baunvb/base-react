import axios from "axios";
import { host } from "config/host";
import { sessionService } from "redux-react-session";
import { API, COOKIE_KEY } from 'config/Constant.js'
import { getCookie } from 'common/function.jsx'
const AGENT = "Bearer "

const UNAUTHORIZED = 401;


export const postRequest = (api, data, fn) => {
    axios.post(host.concat(api), data)
        .then((res) => {
            fn(res.data)
        })
        .catch((err) => console.log(err));
}

export const getRequest = (api, fn) => {
    axios.get(host.concat(api))
        .then((res) => {
            fn(res.data)
        })
        .catch((err) => console.log(err));
}


export const postByToken = (api, data, fn) => {
    var contentType = "application/json";
    const token_id = getCookie(COOKIE_KEY.TOKEN);
    axios.post(`${host}${api}`, data, {
        headers: {
            "Content-Type": contentType,
            "authorization": AGENT + token_id
        }
    })
        .then((res) => {
            fn(res.data)
        })
        .catch((err) => {
            console.log(`Request api ${api}: `, err)
            if (err.response && err.response.status === UNAUTHORIZED && api !== API.GET_INFO) {
                window.location.replace("/login")
            }
        });

}

export const getByToken = (api, fn) => {
    const token_id = getCookie(COOKIE_KEY.TOKEN);
    axios.get(`${host}${api}`, {
        headers: {
            "Content-Type": "application/json",
            "authorization": AGENT + token_id
        }
    })
        .then((res) => {
            fn(res.data)
        })
        .catch((err) => {
            console.log(`Request api ${api}: `, err)
            if (err.response.status === UNAUTHORIZED && api !== API.GET_INFO) {
                window.location.replace("/login")
            }
            fn(err.response)
        });

}