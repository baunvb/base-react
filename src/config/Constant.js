const STORAGE_STATUS = {
  APPOINTMENT: "APPOINTMENT",
  CONFIRM: "CONFIRM",
  COMPLETE: "COMPLETE",

}

const RESPONSE_CODE = {
  UNAUTHORIZED: 401
}

const API = {
  LOGIN: "station/login",
  BOOKING_LIST: "station/bookedlist",
  CONFIRMED_LIST: "station/confirmedlist",
  COMPLETED_LIST: "station/completedlist",
  REQUEST_COMPLETE: "station/complete",
  REQUEST_COMFIRM_APPOINTMENT: "station/confirm",
  CHANGE_PASSWORD: "station/changepassword",
  RESET_PASSWORD: "station/resetpassword",
  GET_INFO: "station/info",
  NEW_BOOK: "station/newbook",

  UPDATE_INFO: "station/updateinfo",
  REQUEST_PRICE: 'enduser/price'

}

const ITEMS = [{
  value: 0,
  text: '0'
},{
  value: 1,
  text: '1'
}, {
  value: 2,
  text: '2'
}, {
  value: 3,
  text: '3'
}, {
  value: 4,
  text: '4'
}, {
  value: 5,
  text: '5'
}, {
  value: 6,
  text: '6'
}, {
  value: 7,
  text: '7'
}, {
  value: 8,
  text: '8'
}, {
  value: 10,
  text: '9'
}, {
  value: 9,
  text: '10'
}]

export { STORAGE_STATUS, API, RESPONSE_CODE, ITEMS }
