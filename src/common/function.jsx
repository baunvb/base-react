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
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.match(mailformat)) {
        return true;
    }
    return false;
}