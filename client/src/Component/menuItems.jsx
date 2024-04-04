// menuItems.js
import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import ViewListIcon from '@mui/icons-material/ViewList';
import ReportIcon from '@mui/icons-material/Report';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddAlertIcon from '@mui/icons-material/AddAlert';


export const menuItems = [
  { text: "Home", icon: <HomeIcon />, path: "/"},
  { text: "Employee", icon: <AppRegistrationIcon/>, path: "/registeration"},
  { text: "Master", icon: <ViewListIcon/>, path: "/master"},
  { text: "Team", icon: <GroupAddIcon/>, path: "/team" },
  { text: "My Team", icon: <GroupsIcon/>, path: "/myteam" },
  { text: "Assignment", icon: <AssignmentIcon />, path: "/assignment" },
  { text: "My Task", icon: <AssignmentTurnedInIcon/> , path: "/view-assignment" },
  { text: "Team Task", icon: <AssignmentTurnedInIcon/> , path: "/teamTask" },
  { text: "Alert", icon: <AddAlertIcon /> , path: "/CreateAlert" },
  { text: "Report", icon: <ReportIcon  />, path: "/report" },
];


