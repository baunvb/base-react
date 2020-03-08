const STORAGE_STATUS = {
  APPOINTMENT: "APPOINTMENT",
  CONFIRM: "CONFIRM",
  COMPLETE: "COMPLETE",

}

const RESPONSE_CODE = {
  UNAUTHORIZED: 401
}

const API = {
  LOGIN: "api/station/login",
  BOOKING_LIST: "api/station/bookedlist",
  CONFIRMED_LIST: "api/station/confirmedlist",
  COMPLETED_LIST: "api/station/completedlist",
  REQUEST_COMPLETE: "api/station/complete",
  REQUEST_COMFIRM_APPOINTMENT: "api/station/confirm",
  CHANGE_PASSWORD: "api/station/changepassword",
  RESET_PASSWORD: "api/station/resetpassword",
  GET_INFO: "api/station/info",
  NEW_BOOK: "api/station/newbook",

  UPDATE_INFO: "api/station/updateinfo",
  UPDATE_AVATAR: "api/station/updateavatar",
  REQUEST_PRICE: 'api/enduser/price',
  
  GET_PRICING: 'price/pricelist',

  FETCH_REPORT: 'api/station/dashboard',

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

export { STORAGE_STATUS, API, RESPONSE_CODE, ITEMS, REPORT_TYPE, ITEMS_MONTH, ITEMS_YEAR }
