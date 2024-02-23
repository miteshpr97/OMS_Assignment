// import React, { useState, useEffect } from "react";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditNoteIcon from "@mui/icons-material/EditNote";
// import { Button, Col, Form, InputGroup, Modal, Row } from "react-bootstrap";
// import { Typography } from "@mui/material";

// const ViewDepartmentData = () => {
//   const [tableData, setTableData] = useState([]);

//   const [filteredData, setFilteredData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(25);

//   // fetching data to below table
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const apiUrl = "http://localhost:3306/api/department";
//         const response = await fetch(apiUrl, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });

//         const result = await response.json();
//         const reversedData = result.reverse();
//         setTableData(reversedData);
//         setFilteredData(result);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

//   // Change page
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   // delete btn
//   const handleDelete = async (DepartmentID) => {
//     // Display a confirmation dialog
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this item?"
//     );

//     if (!confirmDelete) {
//       // If the user clicks "Cancel" in the confirmation dialog, do nothing
//       return;
//     }

//     try {
//       const apiUrl = `http://localhost:3306/api/department/delete/${DepartmentID}`;
//       const response = await fetch(apiUrl, {
//         method: "DELETE",
//       });

//       if (response.ok) {
//         // Remove the deleted item from both data and filteredData arrays
//         setFilteredData((prevData) =>
//           prevData.filter((item) => item.DepartmentID !== DepartmentID)
//         );
//       } else {
//         console.error("Error deleting item:", response.status);
//       }
//     } catch (error) {
//       console.error("Error deleting item:", error);
//     }
//   };

//   const [show, setShow] = useState(false);

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   return (
//     <div className="Department-table">
//       <div>
//         <Typography variant="h5" style={{ fontWeight: "500" }}>
//           Department Data
//         </Typography>
//       </div>
//       <div style={{ maxHeight: "400px", overflowY: "auto", marginTop: "20px" }}>
//         <table className="table table-striped table-bordered">
//           <thead style={{ fontSize: "15px" }}>
//             <tr>
//               <th>Department ID</th>
//               <th>Department Name</th>
//               <th>Edit</th>
//               <th>Delete</th>
//             </tr>
//           </thead>
//           <tbody style={{ fontSize: "13px" }}>
//             {currentItems.map((item) => (
//               <tr key={item._id}>
//                 <td>{item.DepartmentID}</td>
//                 <td>{item.DepartmentName}</td>
//                 <td
//                   style={{
//                     color: "#055f85",

//                     cursor: "pointer",
//                   }}
//                   onClick={handleShow}
//                 >
//                   <EditNoteIcon />
//                 </td>
//                 <td
//                   style={{
//                     color: "red",

//                     cursor: "pointer",
//                   }}
//                   onClick={() => handleDelete(item.DepartmentID)}
//                 >
//                   <DeleteIcon />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <Modal
//         show={show}
//         size="lg"
//         onHide={handleClose}
//         style={{ flexGrow: 1, p: 3, marginTop: "75px" }}
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>Edit Department</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Row className="mb-3">
//               <Form.Group as={Col} md="6">
//                 <Form.Label>Department ID</Form.Label>
//                 <InputGroup hasValidation>
//                   <Form.Control
//                     style={{ fontWeight: "600", fontSize: "15px" }}
//                     type="text"
//                     placeholder="Department ID"
//                     aria-describedby="inputGroupPrepend"
//                     name="DeparmentID"
//                     required
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     Please Enter Department ID.
//                   </Form.Control.Feedback>
//                 </InputGroup>
//               </Form.Group>

//               <Form.Group as={Col} md="6">
//                 <Form.Label>Department Name</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Department Name"
//                   name="DepartmentName"
//                   required
//                 />
//                 <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//               </Form.Group>
//             </Row>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={handleClose}>
//             Save Changes
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       <ul className="pagination">
//         {Array.from(
//           { length: Math.ceil(filteredData.length / itemsPerPage) },
//           (_, index) => (
//             <li key={index} className="page-item">
//               <button onClick={() => paginate(index + 1)} className="page-link">
//                 {index + 1}
//               </button>
//             </li>
//           )
//         )}
//       </ul>
//     </div>
//   );
// };

// export default ViewDepartmentData;


import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import EditDepartmentDialog from "./EditDepartmentDialog";

const ViewDepartmentData = () => {
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(25);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  // fetching data to below table
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = "http://localhost:3306/api/department";
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
  const handleDelete = async (DepartmentID) => {
    // Display a confirmation dialog
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (!confirmDelete) {
      // If the user clicks "Cancel" in the confirmation dialog, do nothing
      return;
    }

    try {
      const apiUrl = `http://localhost:3306/api/department/delete/${DepartmentID}`;
      const response = await fetch(apiUrl, {
        method: "DELETE",
      });

      if (response.ok) {
        // Remove the deleted item from both data and filteredData arrays
        setFilteredData((prevData) =>
          prevData.filter((item) => item.DepartmentID !== DepartmentID)
        );
      } else {
        console.error("Error deleting item:", response.status);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleEdit = (department) => {
    setSelectedDepartment(department);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setSelectedDepartment(null);
  };

  return (
    <div className="Department-table">
      <div>
        <Typography variant="h5" style={{ fontWeight: "500" }}>
          Department Data
        </Typography>
      </div>
      <div style={{ maxHeight: "400px", overflowY: "auto", marginTop: "20px" }}>
        <table className="table table-striped table-bordered">
          <thead style={{ fontSize: "15px" }}>
            <tr>
              <th>Department ID</th>
              <th>Department Name</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody style={{ fontSize: "13px" }}>
            {currentItems.map((item) => (
              <tr key={item._id}>
                <td>{item.DepartmentID}</td>
                <td>{item.DepartmentName}</td>
                <td
                  style={{
                    color: "#055f85",
                    cursor: "pointer",
                  }}
                  onClick={() => handleEdit(item)}
                >
                  <EditNoteIcon />
                </td>
                <td
                  style={{
                    color: "red",
                    cursor: "pointer",
                  }}
                  onClick={() => handleDelete(item.DepartmentID)}
                >
                  <DeleteIcon />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        count={Math.ceil(filteredData.length / itemsPerPage)}
        variant="outlined"
        shape="rounded"
        onChange={(event, page) => paginate(page)}
      />

      <EditDepartmentDialog
        open={openEditDialog}
        handleClose={handleCloseEditDialog}
        department={selectedDepartment}
      />
    </div>
  );
};

export default ViewDepartmentData;
