import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Component/loginPage/Login";
import Signup from "./Component/signup/Signup";
import Home from "./Page/Home/Home";
import RegisterPage from "./Page/NewEmployee/RegisterPage";
import Master from "./Page/Master/Master";
import TeamMember from "./Page/Team/AllTeamMembers";
import MyTeam from "./Page/MyTeam/MyTeam";
import Create from "./Page/Team/CreateGroup/Create";
import NewAssignment from "./Page/Assignment/NewAssignment";
import MyTask from "./Page/MyTask/ViewAssignment";
import TeamTask from "./Page/TeamTask/TeamTask";
import Report from "./Page/Report/Report";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import CreateAlert from "./Page/Alert/CreateAlert";
import ForgotPassword from "./Component/forgotPassword/ForgotPassword";
import ResetPassword from "./Component/forgotPassword/ResetPassword";
import setAuthToken from "./utils/setAuthToken";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}



export default function App() {
  return (
    <>
      <Routes>
        <Route path="/loginpage" element={<Login />}></Route>
        <Route path="/signuppage" element={<Signup />}></Route>
        <Route path="/forgetPassword" element={<ForgotPassword/>}></Route>
        <Route path="/ResetPassword/:token" element={<ResetPassword/>}></Route>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/registeration" element={<RegisterPage />}></Route>
          <Route path="/master" element={<Master />} />
          <Route path="/createteam/:EmployeeID" element={<Create />}></Route>
          <Route path="/team" element={<TeamMember />}></Route>
          <Route path="/myteam" element={<MyTeam />}></Route>
          {/* <Route path="/myteam" element={<MyTeam />}></Route> */}
          <Route path="/assignment" element={<NewAssignment />}></Route>
          <Route path="/view-assignment" element={<MyTask />}></Route>
          <Route path="teamTask" element={<TeamTask />}></Route>
          <Route path="CreateAlert" element={<CreateAlert />}></Route>
          <Route path="/report" element={<Report />}></Route>
        </Route>
      </Routes>
    </>
  );
}





