import { createBrowserRouter } from "react-router";
import SplashScreen from "./screens/SplashScreen";
import LanguageSelection from "./screens/LanguageSelection";
import Login from "./screens/Login";
import Dashboard from "./screens/Dashboard";
import SmartAttendance from "./screens/SmartAttendance";
import ChildProfile from "./screens/ChildProfile";
import ActivityPlanner from "./screens/ActivityPlanner";
import ActivityWalkthrough from "./screens/ActivityWalkthrough";
import HomeVisitAssistant from "./screens/HomeVisitAssistant";
import ParentReminder from "./screens/ParentReminder";
import ReportGenerator from "./screens/ReportGenerator";
import WorkerWellness from "./screens/WorkerWellness";
import SupervisorDashboard from "./screens/SupervisorDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: SplashScreen,
  },
  {
    path: "/language",
    Component: LanguageSelection,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/dashboard",
    Component: Dashboard,
  },
  {
    path: "/attendance",
    Component: SmartAttendance,
  },
  {
    path: "/child/:id",
    Component: ChildProfile,
  },
  {
    path: "/activities",
    Component: ActivityPlanner,
  },
  {
    path: "/activity-walkthrough/:id",
    Component: ActivityWalkthrough,
  },
  {
    path: "/home-visits",
    Component: HomeVisitAssistant,
  },
  {
    path: "/parent-connect",
    Component: ParentReminder,
  },
  {
    path: "/reports",
    Component: ReportGenerator,
  },
  {
    path: "/wellness",
    Component: WorkerWellness,
  },
  {
    path: "/supervisor",
    Component: SupervisorDashboard,
  },
]);
