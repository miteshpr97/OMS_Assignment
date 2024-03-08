import React from 'react'
import SideBar from '../../Component/SideBar'
import Box from '@mui/material/Box';
import './Home.css'



export default function Home() {
  return (
    <Box sx={{display:'flex'}}>
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1 ,marginTop:"55px"}}>
      <div className="d-flex align-items-center justify-content-center home">
      <div className="home-title">
        <div className="title1">WELCOME</div>
        <div className="title2">
          <span>To</span>
        </div> 
        <div className="title3">
          <span>OWM <p> Logistics</p></span>
        </div>
      </div> 
    </div>
        
      </Box>
    </Box>
  )
}
