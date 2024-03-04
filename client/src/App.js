import React from "react";
import { Routes, Route } from "react-router-dom";
import Settings from "./Page/Settings";
import Home from "./Page/Home/Home";
// import RegisterPage from "./Component/registrationPage/RegisterPage";
import RegisterPage from "./Page/NewEmployee/RegisterPage";

import Login from "./Component/loginPage/Login";
import Signup from "./Component/signup/Signup";

import NewTask from "./Page/Task/NewTask";
// import TeamMember from './Page/Team/TeamMember'

import TeamMember from "./Page/Team/AllTeamMembers";
import Create from "./Page/Team/CreateGroup/Create";
// import CreateTeam from './Page/Team/CreateTeam/CreateTeam'
import ViewEmployee from "./Page/viewEmployee/ViewEmployee";
import Department from "./Page/Department/Department";
import NewDesignation from "./Page/Designation/NewDesignation";
import Master from "./Page/Master/Master";
import NewAssignment from "./Page/Assignment/NewAssignment";

import MyTeam from "./Page/MyTeam/MyTeam";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import MyTask from "./Page/MyTask/ViewAssignment"

export default function App() {
  return (
    
    <>
      <Routes>
        <Route path="/loginpage" element={<Login />}></Route>
        <Route path="/signuppage" element={<Signup />}></Route>

        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/viewEmployee" element={<ViewEmployee />}></Route>
          <Route path="/Department" element={<Department />}></Route>
          <Route path="/newdesignation" element={<NewDesignation />} />
          <Route path="/master" element={<Master/>} />
          <Route path="/newdesignation" element={<NewDesignation />}></Route>
          <Route path="/team" element={<TeamMember />}></Route>
          <Route path="/myteam" element={<MyTeam/>}></Route>
          <Route path="/assignment" element={<NewAssignment />}></Route>
          <Route path="/view-assignment" element={<MyTask/>}></Route>
          <Route path="/task" element={<NewTask />}></Route>
          <Route path="/settings" element={<Settings />}></Route>
          {/* <Route path="/newEmployee" element={<RegisterPage />}></Route> */}
          <Route path="/createteam/:EmployeeID" element={<Create />}></Route>
          <Route path="/Newtask" element={<NewTask />}></Route>
          <Route path="/registeration" element={<RegisterPage />}></Route>
        </Route>
      </Routes>
    </>
  );
}
