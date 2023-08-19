import React, { useState } from "react";
import {
  Button,
  Menu,
  MenuItem,
  Box,
  InputLabel,
  FormControl,
  Select,
} from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import "./header.css";

export default function BasicMenu(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [group, setGroup] = useState("status");
  const [ordering, setOrdering] = useState("priority");

  const handleGroupingChange = (event) => {
    const newGroup = event.target.value;
    setGroup(newGroup);
    props.onGroupingChange(newGroup);
  };

  const handleOrderingChange = (event) => {
    const newOrdering = event.target.value;
    setOrdering(newOrdering);
    props.onOrderingChange(newOrdering);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        variant="outlined"
        style={{ marginTop: "6px", marginLeft: "6px" }}
      >
        <TuneIcon />
        Dashboard
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <div style={{ padding: "16px" }}>
          <Box sx={{ minWidth: 240 }} style={{ marginTop: "6px" }}>
            <FormControl fullWidth>
              <InputLabel id="grouping-label">Grouping</InputLabel>
              <Select
                labelId="grouping-label"
                value={group}
                label="Grouping"
                onChange={handleGroupingChange}
              >
                <MenuItem value={"status"}>Status</MenuItem>
                <MenuItem value={"user"}>User</MenuItem>
                <MenuItem value={"priority"}>Priority</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ minWidth: 240, marginTop: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="ordering-label">Ordering</InputLabel>
              <Select
                labelId="ordering-label"
                value={ordering}
                label="Ordering"
                onChange={handleOrderingChange}
              >
                <MenuItem value={"priority"}>Priority</MenuItem>
                <MenuItem value={"title"}>Title</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
      </Menu>
    </div>
  );
}
