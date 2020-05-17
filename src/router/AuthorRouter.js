
import LoginScreen from "../screen/author/LoginScreen"
import RegisterScreen from "../screen/author/RegisterScreen"

export const AuthorRouter = [
  {
    path: "/login",
    component: LoginScreen,
    name: "Login"
  },
  {
    path: "/register",
    component: RegisterScreen,
    name: "Register"
  }
]