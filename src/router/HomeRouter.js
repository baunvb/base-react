
import SampleHomeOne from "../screen/home/SampleHomeOne"
import SampleHomeTwo from "../screen/home/SampleHomeTwo"

export const HomeRouter = [
  {
    path: "/home",
    component: SampleHomeOne,
    name: "Home"
  },
  {
    path: "/profile",
    component: SampleHomeTwo,
    name: "Profile"
  },
  {
    path: "/news",
    component: null,
    name: "NEWS"
  },
  {
    path: "/schedule",
    component: null,
    name: "SCHEDULE"
  }
]