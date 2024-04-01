// ViewDepartmentData.js
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Pagination,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
// import EditNoteIcon from "@mui/icons-material/EditNote";
import { format } from "date-fns";

import "./Alert.css";


const AlertTable = ({ departments, handleDeleteDepartment}) => {

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(25);
  const [data, setData] = useState([]);

  departments = Array.isArray(departments) ? departments : [];
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = departments.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(departments.length / itemsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };


  useEffect(() => {
    (async () => {
      try {
        const apiUrl = "http://localhost:3306/api/alertDetails";
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, []);

  
  return (
    <div>
      <TableContainer
        component={Paper}
        style={{ maxHeight: "400px", overflowY: "auto", marginTop: "20px",  }}
      >
        <Table size="small">
          <TableHead className="customTableHead">
            <TableRow>
              <TableCell className="vertical-border" sx={{color:"white", padding:"10px 16px", fontSize:"15px"}}>
                Alert ID
              </TableCell>
              <TableCell className="vertical-border" sx={{color:"white", padding:"10px 16px", fontSize:"15px"}}>
                Assigner ID
              </TableCell>
              <TableCell className="vertical-border" sx={{color:"white", padding:"10px 16px", fontSize:"15px"}}>
                AssignTo ID
              </TableCell>
              <TableCell className="vertical-border" sx={{color:"white", padding:"10px 16px", fontSize:"15px"}}>
                Alert Note
              </TableCell>
              <TableCell className="vertical-border" sx={{color:"white", padding:"10px 16px", fontSize:"15px"}}>
                Reminder
              </TableCell>
             
              {/* <TableCell className="vertical-border" sx={{color:"white", padding:"10px 16px", fontSize:"15px"}}>Edit</TableCell> */}
              <TableCell className="vertical-border" sx={{color:"white", padding:"10px 16px", fontSize:"15px"}}>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.DepartmentID} className="custom-row">
                <TableCell className="vertical-border">
                  {item.AlertID}
                </TableCell>
                <TableCell className="vertical-border">
                  {item.EmployeeID}
                </TableCell>
                <TableCell className="vertical-border">
                  {item.EmployeeID_AssignTo}
                </TableCell>
                <TableCell className="vertical-border">
                  {item.Alert_Note}
                </TableCell>
                <TableCell className="vertical-border">
                 {format(new Date(item.ReminderDay), "dd/MM/yyyy")}
                </TableCell>
             
                {/* <TableCell className="vertical-border">
                  <IconButton >
                    <EditNoteIcon
                    sx={{color:"#055f85"}}
                     
                    />
                  </IconButton>
                </TableCell> */}
                <TableCell className="vertical-border" >
                  <IconButton
                    sx={{color:"red" }}
                    onClick={() => handleDeleteDepartment(item.DepartmentID)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        variant="outlined"
        shape="rounded"
        size="large"
        style={{ marginTop: "20px", display: "flex" }}
      />

    
    </div>
  );
};

export default AlertTable


