import React, { useEffect, useState } from 'react'
import SideBar from '../../Component/SideBar'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import "./ViewEmployee.css"
import EditNoteIcon from '@mui/icons-material/EditNote';


const ViewEmployee = () => {
  
    const [tableData, setTableData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(50);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const apiUrl = "http://localhost:3306/api/employee";
            const response = await fetch(apiUrl, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            });
    
            const result = await response.json();
            const reversedData = result.reverse();
            setTableData(reversedData);
            setFilteredData(result);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
      }, []);
    
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    
      // Change page
      const paginate = (pageNumber) => setCurrentPage(pageNumber);
    
  


  return (
    <Box sx={{display:'flex'}}>
    <SideBar />
    <Box component="main" sx={{ flexGrow: 1, p: 3 ,marginTop:"55px"}}>
      
      <div className="viewEmployee-table">
            <div >
          <Typography variant="h5" style={{fontWeight:"500"}}>Employee Data</Typography>
          </div>
          <div
            
            style={{ maxHeight: "400px", overflowY: "auto", marginTop:"20px" }}
          >
            <table className="table table-striped table-bordered">
              <thead style={{ fontSize: "15px" }}>
                <tr>
                  <th>Employee ID</th>
                  <th>Name</th>
                  <th>Designation ID</th>
                  <th>Department ID</th>
                  <th>Status</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody style={{ fontSize: "13px" }}>
                {currentItems.map((item) => (
                  <tr key={item._id}>
                    <td>{item.EmployeeID}</td>
                    <td>
                      {item.FirstName} {item.LastName}
                    </td>
                    <td>{item.DesignationID}</td>
                    <td>{item.DepartmentID}</td>
                    <td>
                    {item.EmploymentStatus=== "Active" ? (
                      <span style={{color:"#6EC531 "}}>{item.EmploymentStatus}</span>
                    ):(<span style={{color:"red"}}>{item.EmploymentStatus}</span>)}</td>

                    <td><EditNoteIcon/></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <ul className="pagination">
            {Array.from(
              { length: Math.ceil(filteredData.length / itemsPerPage) },
              (_, index) => (
                <li key={index} className="page-item">
                  <button
                    onClick={() => paginate(index + 1)}
                    className="page-link"
                  >
                    {index + 1}
                  </button>
                </li>
              )
            )}
          </ul>
        </div>
       
    </Box>
  </Box>
  )
}

export default ViewEmployee

















