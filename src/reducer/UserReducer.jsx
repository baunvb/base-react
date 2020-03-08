import { USER_ACTION } from '../actions/UserActions.js'

var currentState = {
  user: {
    "id": "",
    "email": "",
    "name": "",
    "phone_number": "",
    "address": "",
    "province_code": "",
    "avatar": "",
  }
}

function UserReducer(state = currentState, action) {
  console.log("REDUCER", action)
  switch (action.type) {
    case USER_ACTION.FETCH_INFO:
      return {
        ...state,
        user: action.data,
      }
    case USER_ACTION.UPDATE_INFO:
      return {
        ...state,
        user: {
          ...state.user,
          name: action.data.name,
          phone_number: action.data.phone_number
        },
      }
    case USER_ACTION.UPDATE_AVATAR:
      console.log("UPDATE_AVATAR", action.avatar)
      return {
        ...state,
        user: {
          ...state.user,
          avatar: action.data
        }
      }
    default:
      return { ...state }
  }

}

export default UserReducer
