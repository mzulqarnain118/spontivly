import React, { useState } from "react";
import { Typography, Menu, MenuItem, Tooltip, IconButton } from "@mui/material";
import { MuiIcon } from "./MuiIcon";

const MenuList = ({ items, iconClick, onClose, className, icon, tooltip }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (item) => {
    onClose(item);
    setAnchorEl(null);
  };

  return (
    <>
      {tooltip && (
        <Tooltip title={tooltip}>
          <MuiIcon name={icon} onClick={handleOpen} color="common.black" />
        </Tooltip>
      )}
      <Menu
        sx={{
          mt: "45px",
          right: 0,
          ...className,
        }}
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={() => handleClose(null)} // Pass null as the default value
      >
        {items.map((item) => (
          <MenuItem key={item} onClick={() => handleClose(item)}>
            <Typography textAlign="center">{item}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export {MenuList};
