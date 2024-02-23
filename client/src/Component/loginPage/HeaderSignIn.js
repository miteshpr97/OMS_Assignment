import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using react-router-dom for routing
import logo from '../../assets/images/Gl-Logo.png'; 

function HeaderSignIn() {
  return (
    <div className="signup-header p-2" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor:'#3a7575', height:"64px" }}>
      <div className="logo">
        <Link to={"/"}>
          <img src={logo} alt="logo" height='50px' style={{background:"white", backgroundSize:"140px auto"}}/>
        </Link>
      </div>
      <Link to={"/signuppage"} style={{ textDecoration: "none" }}>
        <div style={{ color: "white", paddingRight: "25px", display: "flex", alignItems: "center" }}>
          <i className="fa-solid fa-right-to-bracket" style={{ fontSize: "19px", color: "white" }}></i>
          <span style={{ fontSize: "12px", marginLeft: "3px", fontWeight: 600 }}>SIGN-UP</span>
        </div>
      </Link>
    </div>
  );
}

export default HeaderSignIn;
