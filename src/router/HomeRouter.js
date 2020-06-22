
import QAcademyScreen from "../screen/home/QAcademyScreen"
import SampleHomeTwo from "../screen/home/SampleHomeTwo"

export const HomeRouter = [
  {
    path: "/q-academy",
    component: QAcademyScreen,
    name: "Q-Academy"
  },
  {
    path: "/q-visit",
    component: QAcademyScreen,
    name: "Q-Visit"
  },
  {
    path: "/q-online",
    component: QAcademyScreen,
    name: "OnlineQ"
  },
  {
    path: "/q-outreach",
    component: QAcademyScreen,
    name: "Q-Outreach"
  },
  {
    path: "/q-contest",
    component: QAcademyScreen,
    name: "Q-Contest"
  },
  {
    path: "/q-shop",
    component: QAcademyScreen,
    name: "Q-Shop"
  },
  {
    path: "/q-media",
    component: QAcademyScreen,
    name: "Q-Media"
  }
]