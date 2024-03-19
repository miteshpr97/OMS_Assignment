import React, { useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

function Action({ StatusData }) {
  const [selectedValue, setSelectedValue] = useState("select");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div>
      <Select
        variant="outlined"
        value={selectedValue}
        onChange={handleChange}
        size="small"
        sx={{ paddingRight: "20px" }}
      >
        <MenuItem value="select">Select</MenuItem>
        <MenuItem value="ACCEPT">Accept</MenuItem>
        <MenuItem value="CANCEL">Cancel</MenuItem>
        <MenuItem value="PROGRESS">Progress</MenuItem>
        <MenuItem value="REGRET">Regret</MenuItem>
        <MenuItem value="COMPLETED">Completed</MenuItem>
      </Select>
    </div>
  );
}

export default Action;
