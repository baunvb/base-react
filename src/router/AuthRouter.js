
import LoginScreen from "../screen/auth/LoginScreen"
import RegisterScreen from "../screen/auth/RegisterScreen"

export const AuthRouter = [
  {
    path: "/auth/login",
    component: LoginScreen,
    name: "Login"
  },
  {
    path: "/auth/register",
    component: RegisterScreen,
    name: "Register"
  },
  { redirect: true, path: "/auth", pathTo: "/auth/login" }

 
]