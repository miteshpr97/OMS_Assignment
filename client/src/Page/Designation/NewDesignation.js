import React, { useEffect, useState } from "react";
import SideBar from "../../Component/SideBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";

import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";

const NewDesignation = () => {
  const [validated, setValidated] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(25);

  const [formData, setFormData] = useState({
    DesignationID: "",
    DesignationName:"",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);

    if (form.checkValidity() === true) {
      try {
        setIsLoading(true);
        const apiUrl = "http://localhost:3306/api/designation";
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (response.ok) console.log("Registration successful!");
        else console.error("Registration failed:", response.statusText);
      } catch (error) {
        console.error("Error submitting data:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

 //last number data
 useEffect(() => {
  const fetchLastJobNo = async () => {
    try {
      const response = await fetch(
        "http://localhost:3306/api/designation/lastDesignationId",
        { method: "GET", headers: { "Content-Type": "application/json" } }
      );
      if (response.ok) {
        const data = await response.json();
        console.log("Received data:", data); // Log received data for debugging
        const numericPart = parseInt(data.lastDesignationId.slice(5), 10);
        console.log("Parsed numeric part:", numericPart); // Log parsed numeric part
        if (!isNaN(numericPart)) {
          const nextJobNo = numericPart + 1;
          setFormData({
            ...formData,
            DesignationID: `DESIG${nextJobNo.toString().padStart(3, "0")}`,
          });
        } else {
          console.error("Invalid numeric part:", data.lastDesignationId);
        }
      } else {
        console.error("Failed to fetch last JobNo");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  fetchLastJobNo();
}, []);



  // fetching data to below table
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = "http://localhost:3306/api/designation";
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


  // delete btn
  const handleDelete = async (DesignationID) => {
    // Display a confirmation dialog
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (!confirmDelete) {
      // If the user clicks "Cancel" in the confirmation dialog, do nothing
      return;
    }

    try {
      const apiUrl = `http://localhost:3306/api/designation/delete/${DesignationID}`;
      const response = await fetch(apiUrl, {
        method: "DELETE",
      });

      if (response.ok) {
        // Remove the deleted item from both data and filteredData arrays
        setFilteredData((prevData) =>
          prevData.filter((item) => item.DesignationID !== DesignationID)
        );
      } else {
        console.error("Error deleting item:", response.status);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
     
            <div className="New-departmemt">
          <Typography variant="h5" style={{fontWeight:"500"}}>New Designation</Typography>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group as={Col} md="6">
                  <Form.Label>Designation ID</Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                      style={{ fontWeight: "600", fontSize: "15px" }}
                      type="text"
                      placeholder="Designation ID"
                      aria-describedby="inputGroupPrepend"
                      name="DesignationID"
                      value={formData.DesignationID}
                      onChange={handleInputChange}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please Enter Designation ID.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>

                <Form.Group as={Col} md="6">
                  <Form.Label>Designation Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Designation Name"
                    name="DesignationName"
                    value={formData.DesignationName}
                    onChange={handleInputChange}
                    required
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                
              </Row>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <Button
                  type="submit"
                  className="btn mt-2 custom-button"
                  disabled={isLoading}
                 style={{backgroundColor:"#055f85", borderColor:"#055f85"}}
                >
                  {isLoading ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </Form>
            </div>

            <div className="Department-table">
            <div >
          <Typography variant="h5" style={{fontWeight:"500"}}>Designation Data</Typography>
          </div>
          <div
            
            style={{ maxHeight: "400px", overflowY: "auto", marginTop:"20px" }}
          >
            <table className="table table-striped table-bordered">
              <thead style={{ fontSize: "15px" }}>
                <tr>
                  <th>Designation ID</th>
                  <th>Designation Name</th>
                  <th>Edit</th>
                  <th>Delete</th>
                 
                </tr>
              </thead>
              <tbody style={{ fontSize: "13px" }}>
                {currentItems.map((item) => (
                  <tr key={item._id}>
                    <td>{item.DesignationID}</td>
                    <td>
                      {item.DesignationName}
                    </td>
                    <td
                          style={{
                            color: "#055f85",
                
                            cursor: "pointer",
                          }}
                        >
                          <EditNoteIcon />
                        </td>
                        <td
                          style={{
                            color: "red",
                       
                            cursor: "pointer",
                          }}
                          onClick={() => handleDelete(item.DesignationID)}
                        >
                          <DeleteIcon />
                        </td>
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
  );
};


export default NewDesignation