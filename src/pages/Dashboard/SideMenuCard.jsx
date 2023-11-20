import { Avatar, Card, ListItemButton, ListItemIcon } from '@mui/material'
import React from 'react';
import { List, ListItemText } from '@mui/material';

import profile from 'assets/images/profile.jpg';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SearchIcon from '@mui/icons-material/Search';
import YouTubeIcon from '@mui/icons-material/YouTube';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
function SideMenuCard({onPortalChange}) {
    const data = [
        'Brouce',
        'Thor',
        'Hank',
        'Shuri'

    ]
    const handleClick = (text) => {
        onPortalChange(text)
      };
    return (
        <Card sx={{ p: 0, boxShadow: 'none', borderRadius: '8px' }}>
            <List>

                <ListItemText sx={{ color: 'var(--petroleum-p-60, #698296)' }} primary="CHANNELS" />
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}  onClick={() => handleClick('general')}>

                        <ListItemText primary="# General" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon sx={{ minWidth: '34px' }}>
                            <AddCircleIcon />
                        </ListItemIcon>
                        <ListItemText sx={{ color: 'var(--petroleum-p-60, #698296)' }} primary="Create Channel" />
                    </ListItemButton>
                </List>
                <ListItemText sx={{ color: 'var(--petroleum-p-60, #698296)' }} primary="COMMUNITY" />

                <List component="div" disablePadding>
                    {data.map((post, index) => (
                        <ListItemButton sx={{ pl: 4 }}>
                            <Avatar src={profile}>
                                {/* User Avatar */}
                            </Avatar>
                            <ListItemText sx={{
                                marginLeft: '8px', color: 'var(--petroleum-p-100, #2D3840)',
                                fontFamily: 'Public Sans',
                                fontSize: '14px',
                                fontStyle: 'normal',
                                fontWeight: 600
                            }} primary={<>
                                {post} <StarRateRoundedIcon style={{ color: '#EAA915' }} />
                            </>} />

                        </ListItemButton>

                    ))}

                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon sx={{ minWidth: '34px' }}>
                            <AddCircleIcon />
                        </ListItemIcon>
                        <ListItemText sx={{ color: 'var(--petroleum-p-60, #698296)' }} primary="Add Member" />
                    </ListItemButton>
                </List>
                <ListItemText sx={{ color: 'var(--petroleum-p-60, #698296)' }} primary="RESOURCES" />
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => handleClick('find')}>
                        <ListItemIcon sx={{ minWidth: '34px' }}>
                            <SearchIcon />
                        </ListItemIcon>
                        <ListItemText sx={{ color: 'var(--petroleum-p-60, #698296)' }} primary="Find Member" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }}  onClick={() => handleClick('library')}>
                        <ListItemIcon sx={{ minWidth: '34px' }}>
                            <YouTubeIcon />
                        </ListItemIcon>
                        <ListItemText sx={{ color: 'var(--petroleum-p-60, #698296)' }} primary="Library" />
                    </ListItemButton>
                </List>
            </List>

        </Card>
    )
}

export default SideMenuCard
