import axios from "axios";
import { host } from "config/host";
import { sessionService } from "redux-react-session";

export const addNew = (url, data, fn) => {
    axios({
        method: 'post',
        url: host.concat(url),
        data: data,
    }).then(function (res) {
        fn(res.data);
    })
        .catch(function (res) {
            console.log(res);
        });
}


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


export const checkToken = () => {
    sessionService.loadUser()
        .then((value) => {
            console.log("token_id", value.token_id);
            let token_id = value.token_id;
            axios.post(host.concat('checkToken'), {}, {
                headers: {
                    "Content-Type": "application/json",
                    "access_token": token_id
                }
            })
                .then((res) => {
                    console.log("checkToken", res);
                    return res.data.message;
                })
                .catch((err) => console.log(err));
        })
        .catch((err) => {
            console.log(err);
        })
}

export const postByHeader = (api, data, fn) => {
    sessionService.loadUser()
        .then((value) => {
            let token_id = value.token_id;
            axios.post(host.concat(api), data, {
                headers: {
                    "Content-Type": "application/json",
                    "access_token": token_id
                }
            })
                .then((res) => {
                    fn(res.data)
                })
                .catch((err) => console.log(err));
        })
        .catch((err) => {
            console.log(err);
        })

}

export const getByHeader = (api, data, fn) => {
    sessionService.loadUser()
        .then((value) => {
            let token_id = value.token_id;
            axios.post(host.concat(api), data, {
                headers: {
                    "Content-Type": "application/json",
                    "access_token": token_id
                }
            })
                .then((res) => {
                    fn(res.data)
                })
                .catch((err) => console.log(err));
        })
        .catch((err) => {
            console.log(err);
        })

}


export const postByToken = (api, data, fn) => {
    sessionService.loadUser()
        .then((value) => {
            let token_id = value.token_id;
            axios.post(`${host}${api}`, data, {
                headers: {
                    "Content-Type": "application/json",
                    "access_token": token_id
                }
            })
                .then((res) => {
                    fn(res.data)
                })
                .catch((err) => console.log(err));
        })
        .catch((err) => {
            console.log(err);
        })

}

export const getByToken = (api, fn) => {
    sessionService.loadUser()
        .then((value) => {
            let token_id = value.token_id;
            axios.get(`${host}${api}`, {
                headers: {
                    "Content-Type": "application/json",
                    "access_token": token_id
                }
            })
                .then((res) => {
                    fn(res.data)
                })
                .catch((err) => console.log(err));
        })
        .catch((err) => {
            console.log(err);
        })

}