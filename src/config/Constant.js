const STORAGE_STATUS = {
  APPOINTMENT: "APPOINTMENT",
  CONFIRM: "CONFIRM",
  COMPLETE: "COMPLETE",

}

const RESPONSE_CODE = {
  UNAUTHORIZED: 401
}

const API = {
  LOGIN: "api/receptionist/login",
  BOOKING_LIST: "api/receptionist/bookedlist",
  CONFIRMED_LIST: "api/receptionist/confirmedlist",
  COMPLETED_LIST: "api/receptionist/completedlist",
  REQUEST_COMPLETE: "api/receptionist/complete",
  REQUEST_COMFIRM_APPOINTMENT: "api/receptionist/confirm",
  CHANGE_PASSWORD: "api/receptionist/changepassword",
  RESET_PASSWORD: "api/receptionist/resetpassword",
  GET_INFO: "api/receptionist/stationinfo",
  NEW_BOOK: "api/receptionist/newbook",

  UPDATE_INFO: "api/receptionist/updateinfo",
  UPDATE_AVATAR: "api/receptionist/updateavatar",
  REQUEST_PRICE: 'api/enduser/price',
  
  GET_PRICING: 'price/pricelist',

  FETCH_REPORT: 'api/receptionist/stationdashboard',
  FETCH_LIST_COMPLETE: 'api/receptionist/allappointment'

}

const ITEMS = [{
  value: 0,
  text: '0'
},{
  value: 1,
  text: '01'
}, {
  value: 2,
  text: '02'
}, {
  value: 3,
  text: '03'
}, {
  value: 4,
  text: '04'
}, {
  value: 5,
  text: '05'
}, {
  value: 6,
  text: '06'
}, {
  value: 7,
  text: '07'
}, {
  value: 8,
  text: '08'
}, {
  value: 9,
  text: '09'
}, {
  value: 10,
  text: '10'
}]

const ITEMS_MONTH = [{
  value: 1,
  text: '01'
}, {
  value: 2,
  text: '02'
}, {
  value: 3,
  text: '03'
}, {
  value: 4,
  text: '04'
}, {
  value: 5,
  text: '05'
}, {
  value: 6,
  text: '06'
}, {
  value: 7,
  text: '07'
}, {
  value: 8,
  text: '08'
}, {
  value: 9,
  text: '09'
}, {
  value: 10,
  text: '10'
}, {
  value: 11,
  text: '11'
}, {
  value: 12,
  text: '12'
}]

var ITEMS_YEAR = [];
const START_YEAR = 2019;
const currentYear = new Date().getFullYear();http://localhost:4000/dashboard
for(var i = currentYear; i >= START_YEAR; i--){
  ITEMS_YEAR.push({
    value: i,
    text: i + ''
  })
}

const REPORT_TYPE = {
  MONTH: "month",
  DAY: "day",
  YEAR: "year"
}

const COOKIE_KEY = {
  TOKEN: "TOKEN"
}

export { STORAGE_STATUS, API, RESPONSE_CODE, ITEMS, REPORT_TYPE, ITEMS_MONTH, ITEMS_YEAR, COOKIE_KEY }
