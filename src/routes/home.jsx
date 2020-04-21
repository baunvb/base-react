import Screen2 from "views/Screen2/Screen2.jsx";
import Timeline from "material-ui-icons/Timeline";
import Screen1 from "views/Screen1/Screen1.jsx"

import WorkOutlineIcon from '@material-ui/icons/WorkOutline';
import UserProfile from "views/Profile/UserProfile.jsx"


var homeRouter = [
  {
    path: "/home",
    name: "Screen1",
    icon: WorkOutlineIcon,
    component: Screen1
  },
  {
    path: "/dashboard",
    name: "Screen2",
    icon: Timeline,
    component: Screen2
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
export default homeRouter;
