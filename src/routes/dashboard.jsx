import Dashboard from "views/Dashboard/Dashboard.jsx";
import Timeline from "material-ui-icons/Timeline";
import MainStationMng from "views/Station/MainStationMng.jsx"
import AddNewBooking from "views/Booking/AddNewBooking.jsx";
import CompleteBooking from "views/Booking/CompleteBooking";
import ComfirmUserBooking from "views/Booking/ComfirmUserBooking";
import DetailBooking from "views/Booking/DetailBooking";

import WorkOutlineIcon from '@material-ui/icons/WorkOutline';
import UserProfile from "views/Profile/UserProfile.jsx"
var dashRoutes = [
  {
    path: "/home",
    name: "Luggage Storage",
    icon: WorkOutlineIcon,
    component: MainStationMng
  },
  {
    hide: true,
    path: "/addNewAppoinment",
    name: "",
    icon: null,
    component: AddNewBooking
  },
  {
    hide: true,
    path: "/completebooking",
    name: "",
    icon: null,
    component: CompleteBooking
  },
  {
    hide: true,
    path: "/confirmbooking",
    name: "",
    icon: null,
    component: ComfirmUserBooking
  },
  {
    hide: true,
    path: "/bookingdetail",
    name: "",
    icon: null,
    component: DetailBooking
  },
  {
    path: "/dashboard",
    name: "Report",
    icon: Timeline,
    component: null
  },
  {
    hide: true,
    path: "/profile",
    name: "Profile",
    component: UserProfile,
    icon: null
  },
  { redirect: true, path: "/", pathTo: "/home", name: "" },

];
export default dashRoutes;
