import { combineReducers } from 'redux'
import { sessionReducer } from 'redux-react-session';
import SampleReducer from 'reducer/SampleReducer.jsx'

const myReducer = combineReducers({
  session: sessionReducer,
  sample: SampleReducer
})

export default myReducer
