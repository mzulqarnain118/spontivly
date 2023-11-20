import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import logo from 'assets/images/Logo.png';
import profile from 'assets/images/profile.jpg';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar
            position="static"
            sx={{
                backgroundColor: 'white',
                top: 0,
                left: 0,
                right: 0,
                position: 'fixed',
                boxShadow: 'none', // Remove shadow
                borderBottom: '1px solid #e0e0e0', // Add outline to the bottom
            }}
        >
            <Container maxWidth={false}>
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <img src={logo} loading="lazy" alt="" />
                    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
                        <Box sx={{ borderLeft: '1px solid #e0e0e0', width: '240px', padding: '20px 16px' }}>
                            <Tooltip title="Open settings">
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <IconButton  sx={{ p: 0 }}>
                                        <Avatar alt="Remy Sharp" src={profile} />
                                    </IconButton>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: 1 }}>
                                        <Typography level="title-md" sx={{color:'black'}}>Nick Fury</Typography>
                                        <Typography sx={{ color: 'var(--character-secondary, #8C8C8C)' }}>Avengers Inc.</Typography>
                                    </Box>
                                    <ArrowDropDownIcon sx={{color:'black'}} onClick={handleOpenUserMenu}/>
                                </Box>
                            </Tooltip>
                            <Menu
                                sx={{
                                    mt: '45px',
                                    right: 0, // Move the menu to the right
                                }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default ResponsiveAppBar;
