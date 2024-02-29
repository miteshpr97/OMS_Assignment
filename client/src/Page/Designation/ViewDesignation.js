// import React, { useEffect, useState } from "react";

// import DeleteIcon from "@mui/icons-material/Delete";
// import EditNoteIcon from "@mui/icons-material/EditNote";

// const ViewDesignation = ({designationData}) => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(25);

//   // // fetching data to below table
//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     try {
//   //       const apiUrl = "http://localhost:3306/api/designation";
//   //       const response = await fetch(apiUrl, {
//   //         method: "GET",
//   //         headers: {
//   //           "Content-Type": "application/json",
//   //         },
//   //       });

//   //       const result = await response.json();
//   //       const reversedData = result.reverse();
//   //       setTableData(reversedData);
//   //       setFilteredData(result);
//   //     } catch (error) {
//   //       console.error("Error fetching data:", error);
//   //     }
//   //   };

//   //   fetchData();
//   // }, []);

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = designationData.slice(indexOfFirstItem, indexOfLastItem);

//   // Change page
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   // delete btn
//   const handleDelete = async (DesignationID) => {
//     // Display a confirmation dialog
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this item?"
//     );

//     if (!confirmDelete) {
//       // If the user clicks "Cancel" in the confirmation dialog, do nothing
//       return;
//     }

//     try {
//       const apiUrl = `http://localhost:3306/api/designation/delete/${DesignationID}`;
//       const response = await fetch(apiUrl, {
//         method: "DELETE",
//       });

//       if (response.ok) {
//         // Remove the deleted item from both data and filteredData arrays
//         designationData((prevData) =>
//           prevData.filter((item) => item.DesignationID !== DesignationID)
//         );
//       } else {
//         console.error("Error deleting item:", response.status);
//       }
//     } catch (error) {
//       console.error("Error deleting item:", error);
//     }
//   };



//   return (
//     <div className="Department-table">
//       <div style={{ maxHeight: "400px", overflowY: "auto", marginTop: "20px" }}>
//         <table className="table table-striped table-bordered">
//           <thead style={{ fontSize: "15px" }}>
//             <tr>
//               <th>Designation ID</th>
//               <th>Designation Name</th>
//               <th>Edit</th>
//               <th>Delete</th>
//             </tr>
//           </thead>
//           <tbody style={{ fontSize: "13px" }}>
//             {currentItems.map((item) => (
//               <tr key={item._id}>
//                 <td>{item.DesignationID}</td>
//                 <td>{item.DesignationName}</td>
//                 <td
//                   style={{
//                     color: "#055f85",

//                     cursor: "pointer",
//                   }}
//                 >
//                   <EditNoteIcon />
//                 </td>
//                 <td
//                   style={{
//                     color: "red",

//                     cursor: "pointer",
//                   }}
//                  onClick={() => handleDelete(item.DesignationID)}
//                 >
//                   <DeleteIcon />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       <ul className="pagination">
//         {Array.from(
//           { length: Math.ceil(designationData.length / itemsPerPage) },
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

// export default ViewDesignation;




import React, {  useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Pagination } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";

const ViewDesignation = ({ designationData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(25);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = designationData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(designationData.length / itemsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleDelete = async (DesignationID) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");

    if (!confirmDelete) {
      return;
    }

    try {
      const apiUrl = `http://localhost:3306/api/designation/delete/${DesignationID}`;
      const response = await fetch(apiUrl, {
        method: "DELETE",
      });

      if (response.ok) {
        // Remove the deleted item from both data and filteredData arrays
        designationData((prevData) =>
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
    <div className="Department-table">
      <TableContainer component={Paper} style={{ maxHeight: "400px", overflowY: "auto", marginTop: "20px" }}>
        <Table className="table" aria-label="designation table">
          <TableHead>
            <TableRow>
              <TableCell>Designation ID</TableCell>
              <TableCell>Designation Name</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentItems.map((item) => (
              <TableRow key={item.DesignationID}>
                <TableCell>{item.DesignationID}</TableCell>
                <TableCell>{item.DesignationName}</TableCell>
                <TableCell>
                  <IconButton style={{ color: "#055f85" }}>
                    <EditNoteIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton style={{ color: "red" }} onClick={() => handleDelete(item.DesignationID)}>
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
        style={{ marginTop: '20px', display: 'flex',  }}
      />
    </div>
  );
};

export default ViewDesignation;
