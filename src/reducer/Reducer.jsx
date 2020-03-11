import { combineReducers } from 'redux'
import { sessionReducer } from 'redux-react-session';
import UserReducer from 'reducer/UserReducer.jsx'
import ReportReducer from 'reducer/ReportReducer.jsx'

import { STORAGE_ACTION } from 'actions/StorageActions.js'
var currentState = {
  bookingList: [],
  confirmList: [],
  completeList: [],
  pricing: {
    hourly_rates: [],
    daily_rates: []
  },
  tab: 0,
  isLoadDone: false
}

function StorageReducer(state = currentState, action) {
  console.log("REDUCER", action)
  switch (action.type) {
    case STORAGE_ACTION.BOOKING_LIST:
      return {
        ...state,
        bookingList: action.data,
      }
    case STORAGE_ACTION.CONFIRM_LIST:
      return {
        ...state,
        confirmList: action.data,
      }
    case STORAGE_ACTION.COMPLETE_LIST:
      return {
        ...state,
        completeList: action.data,
      }
    case STORAGE_ACTION.PRICING_LIST:
      return {
        ...state,
        pricing: {
          hourly_rates: action.data.hourly_rates,
          daily_rates: action.data.daily_rates.rates,
        }
      }
    case STORAGE_ACTION.STORAGE_TAB:
      return {
        ...state,
        tab: action.data
      }
    case STORAGE_ACTION.IS_LOAD_DONE:
      return {
        ...state,
        isLoadDone: true
      }
    default:
      return { ...state }
  }

}

const myReducer = combineReducers({
  session: sessionReducer,
  user: UserReducer,
  storage: StorageReducer,
  report: ReportReducer
})

export default myReducer
