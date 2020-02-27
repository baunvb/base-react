
import { API } from 'config/Constant';
import axios from "axios";
import { host } from "config/host";

export const vndStyle = (vnd) => {
    if(vnd === undefined || vnd === ""){
        return 0;
    }
    return vnd.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export const vndStyleNumber = (vnd) => {
    return vnd.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}


export const vndRound = (vnd) => {
    return Math.round(vnd / 1000) * 1000;
}

export const isValidateArray = (arr) => {
    for(let i = 0; i < arr.length; i++){
        if(arr[i] === "" || arr[i] === undefined || arr[i] === 0){
            return false
        }
    }
    return true;
}

export const normalizeDate = (date) => {
    if(date === "" || date === undefined){
        return ""
    }
    const arr = date.split("/");
    return `${arr[1]}\/${arr[0]}\/${arr[2]}`
}

// time: 15:20
export const forma24Hto12H = (time) => {
    var apm = "am";
    const timeArr = time.split(":") //eg. 11:20
    var hours = timeArr[0];
    const minutes = timeArr[1];
    if (hours > 0 && hours < 12) {
        // keep hours and apm = "am"
    } else {
        // lấy giờ chiều định dạng 12 giờ, đổi sang pm
        hours = hours % 12;
        apm = "pm";
    }
    return `${hours}:${minutes} ${apm}`
}

export const validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export const normalizeDateTime = time => {
    var date = new Date(time);
    var hh = date.getHours();
    var mm = date.getMinutes();
    var dd = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    return {
        time: hh + ":" + mm,
        date: dd + "/" + month + "/" + year
    }
}

export const requestPrice = async (data) => {
    var response = await axios.post(host.concat(API.REQUEST_PRICE), data);
    console.log(response)
    return (response.data.code === 200) ?  response.data.data.price :  0
}