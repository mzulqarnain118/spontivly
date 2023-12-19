import { Typography, Menu, MenuItem, Tooltip, IconButton } from '@mui/material'
import { useState } from 'react'
import MuiIcon from './MuiIcon'

const MenuList = ({ items, onClose, className, icon, tooltip }: any) => {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleOpen = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (item: any) => {
    onClose(item)
    setAnchorEl(null)
  }

  return (
    <>
      {tooltip && (
        <Tooltip title={tooltip}>
          <MuiIcon name={icon} onClick={handleOpen} color="common.black" />
        </Tooltip>
      )}
      <Menu
        sx={{
          mt: '45px',
          right: 0,
          ...className
        }}
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={Boolean(anchorEl)}
        onClose={() => handleClose(null)} // Pass null as the default value
      >
        {items.map((item: any) => (
          <MenuItem key={item} onClick={() => handleClose(item)}>
            <Typography textAlign="center">{item}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default MenuList
