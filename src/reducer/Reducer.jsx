import { combineReducers } from 'redux'
import { sessionReducer } from 'redux-react-session';
import { STORAGE_ACTION } from 'actions/StorageActions.js'
var currentState = {
  bookingList: [],
  confirmList: [],
  completeList: []
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
    default:
      return { ...state }
  }

}

const myReducer = combineReducers({
  session: sessionReducer,
  storage: StorageReducer,
})

export default myReducer
