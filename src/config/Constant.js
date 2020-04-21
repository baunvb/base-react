
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

  UPDATE_INFO: "api/station/updateinfo",
  UPDATE_AVATAR: "api/receptionist/updateavatar",
  REQUEST_PRICE: 'api/enduser/price',
  
  GET_PRICING: 'price/pricelist',

  FETCH_REPORT: 'api/receptionist/stationdashboard',
  FETCH_LIST_COMPLETE: 'api/receptionist/allappointment'

}

const COOKIE_KEY = {
  TOKEN: "TOKEN"
}

export { API, RESPONSE_CODE, COOKIE_KEY }
