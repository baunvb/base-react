import axios from "axios";
import { host } from "config/host";
import { sessionService } from "redux-react-session";
import { API } from 'config/Constant.js'
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
    axios.post(host.concat(api))
        .then((res) => {
            fn(res.data)
        })
        .catch((err) => console.log(err));
}


export const postByToken = (api, data, fn) => {
    var contentType = "application/json";
    // api accept image
    if(api === API.REQUEST_COMFIRM_APPOINTMENT || api === API.REQUEST_COMPLETE || api === API.NEW_BOOK){
        contentType = "multipart/form-data"
    }
    sessionService.loadSession()
        .then((value) => {
            let token_id = value.token;
            console.log("loadSession", value)
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
                        sessionService.deleteSession();
                        sessionService.deleteUser();
                        window.location.replace("/login")
                    }
                });
        })
        .catch((err) => {
            console.log(err);
        })

}

export const getByToken = (api, fn) => {
    sessionService.loadSession()
        .then((value) => {
            let token_id = value.token;
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
                    if (err.response.status === UNAUTHORIZED  && api !== API.GET_INFO) {
                        sessionService.deleteSession();
                        sessionService.deleteUser();
                        window.location.replace("/login")
                    }
                    fn(err.response)
                });
        })
        .catch((err) => {
            console.log(err);
        })

}