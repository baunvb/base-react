import { combineReducers } from 'redux'
import { sessionReducer } from 'redux-react-session';

var currentState = {

}

function bookingReducer(state = currentState, action) {
    return {}
}

function houseReducer(state = { listHouse: [] }, action) {
  return Object.assign({}, state, { [action.type]: action.text })
}

const myReducer = combineReducers({
  session: sessionReducer,
  booking: bookingReducer,
  house: houseReducer
})

export default myReducer
