import { SAMPLE_ACTION } from '../actions/SampleActions.js'

var currentState = {
  text: "This is text from reducer"

}

function SampleReducer(state = currentState, action) {
  switch (action.type) {
    case SAMPLE_ACTION.HELLO:
      return {
        ...state,
        text: action.data
      }
    default:
      return { ...state }
  }

}

export default SampleReducer
