import React, { useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { FormControl, Grid, InputLabel } from "@mui/material";

function Action({ StatusData }) {
  const [selectedValue, setSelectedValue] = useState("select");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <Grid item xs={4} md={4}>
      <FormControl fullWidth variant="outlined">
        <InputLabel>Select</InputLabel>
        <Select
          value={selectedValue}
          onChange={handleChange}
          size="small"
       
          label="Select"
        >
          {StatusData.AssignmentStatus === "Assigned" && (
            <>
              <MenuItem value="ACCEPT">Accept</MenuItem>
              <MenuItem value="CANCEL">Reject</MenuItem>
            </>
          )}
          {StatusData.AssignmentStatus === "Progress" && (
            <>
              <MenuItem value="REGRET">Regret</MenuItem>
              <MenuItem value="COMPLETED">Complete</MenuItem>
            </>
          )}
        
        </Select>
      </FormControl>
    </Grid>
  );
}

export default Action;







// import React, { useState } from "react";
// import Select from "@mui/material/Select";
// import MenuItem from "@mui/material/MenuItem";
// import { FormControl, Grid, InputLabel } from "@mui/material";

// function Action({ StatusData }) {
//   const [selectedValue, setSelectedValue] = useState("select");

//   const handleChange = (event) => {
//     setSelectedValue(event.target.value);
//   };

//   return (
//     <Grid item xs={4} md={4}>
//       <FormControl fullWidth variant="outlined">
//         {StatusData.AssignmentStatus === "Completed" ? (
//           <div style={{ padding: "16px" }}>Complete</div>
//         ) : StatusData.AssignmentStatus === "Reject" ? (
//           <div style={{ padding: "16px" }}>Reject</div>
//         ) : StatusData.AssignmentStatus === "Regret" ? (
//           <div style={{ padding: "16px" }}>Regret</div>
//         ) : (
//           <>
//             <InputLabel id="select-label">Select</InputLabel>
//             <Select
//               value={selectedValue}
//               onChange={handleChange}
//               size="small"
//               labelId="select-label"
//               label="Select"
//             >
//               {StatusData.AssignmentStatus === "Assigned" && (
//                 <>
//                   <MenuItem value="ACCEPT">Accept</MenuItem>
//                   <MenuItem value="CANCEL">Reject</MenuItem>
//                 </>
//               )}
//               {StatusData.AssignmentStatus === "Progress" && (
//                 <>
//                   <MenuItem value="REGRET">Regret</MenuItem>
//                   <MenuItem value="COMPLETED">Complete</MenuItem>
//                 </>
//               )}
//             </Select>
//           </>
//         )}
//       </FormControl>
//     </Grid>
//   );
// }

// export default Action;
