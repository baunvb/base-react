import Dashboard from "views/Dashboard/Dashboard.jsx";
import Timeline from "material-ui-icons/Timeline";
import MainStationMng from "views/Station/MainStationMng.jsx"
import AddNewBooking from "views/Booking/AddNewBooking.jsx";
import CompleteBooking from "views/Booking/CompleteBooking";
import ComfirmUserBooking from "views/Booking/ComfirmUserBooking";
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';
import UserProfile from "views/Profile/UserProfile.jsx"
var dashRoutes = [
  {
    path: "/home",
    name: "Storage",
    icon: WorkOutlineIcon,
    component: MainStationMng
  },
  {
    hide: true,
    path: "/addNewAppoinment",
    name: "Storage",
    icon: Timeline,
    component: AddNewBooking
  },
  {
    hide: true,
    path: "/completebooking",
    name: "Luggage Storage",
    icon: Timeline,
    component: CompleteBooking
  },
  {
    hide: true,
    path: "/confirmbooking",
    name: "Storage",
    icon: Timeline,
    component: ComfirmUserBooking
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
