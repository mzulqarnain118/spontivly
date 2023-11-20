import { Avatar, Box, Button, Card, CardContent, CardHeader, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import filter from 'assets/icons/filter.svg'
import profile from 'assets/images/profile.jpg';
import star from 'assets/icons/star.svg';
import more from 'assets/icons/more.svg';
import UserProfileSidePanel from '../../components/common/UserProfileSidePanel';
function FindMember() {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };
  const data = [
    {
      name: "Scott Lang",
      action: "are both interested in",
      companyName: "Stark Industries",
      purposes: [
        'Climate Change',
        'Quantum Computing'
      ],
    },
    {
      name: "Scott Lang",
      action: "share the objective of",
      companyName: "Stark Industries",
      purposes: [
        'Hiring / Recruiting'
      ],
    },
    {
      name: "Scott Lang",
      action: "are both interested in",
      companyName: "Stark Industries",
      purposes: [
        'Defense Technology'
      ],
    },
    {
      name: "Scott Lang",
      action: "share the objective of",
      companyName: "Stark Industries",
      purposes: [
        'Hiring / Recruiting'
      ],
    },
    {
      name: "Scott Lang",
      action: "are both interested in",
      companyName: "Stark Industries",
      purposes: [
        'Defense Technology'
      ],
    }

  ];
  return (
    <>
      <div style={{
        color: '#000',
        fontFamily: 'Public Sans',
        fontSize: '24px',
        fontStyle: 'normal',
        fontWeight: 600
      }}>
        92 Members
      </div>
      <Card sx={{ p: 0, border: '1px solid var(--petroleum-p-15, #E9EDF0)', boxShadow: 'none', borderRadius: '8px', padding: '20px' }}>
        <Grid container spacing={1}>
          <Grid item xs={8} sx={{ pr: 1 }}> {/* Add padding on the right side */}
            <TextField
              fullWidth
              variant="outlined"
              type="text"
              InputProps={{
                startAdornment:
                  <SearchIcon />
              }}
              placeholder="Search members"
              sx={{
                background: 'var(--petroleum-p-05, #F9FBFD)',
                borderRadius: '8px',
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="select-label">Sort By</InputLabel>
              <Select
                labelId="select-label"
              >
                <MenuItem value="mostRecent">Most Recent</MenuItem>
                <MenuItem value="recommendations">Recommendations</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        {data.map((rec, index) => (
          <Box  onClick={() => handleUserClick(rec)}>
          <CardContent sx={{  display: 'flex', marginTop:'18px', marginBottom:'18px' , padding:'0px'}}>
            <Avatar src={profile} sx={{ marginTop: '5px' }}>
              {/* User Avatar */}
            </Avatar>
            <Grid container alignItems="center" sx={{ display: 'flex', justifyContent: 'space-between' }}>

              <Grid item>
                <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: 1 }}>
                  <Box sx={{ display: 'flex' }}>
                    <Typography sx={{
                      color: 'var(--petroleum-p-75, #4B5D6B)', fontFamily: 'Public Sans',
                      fontSize: '16px',
                      fontStyle: 'normal',
                      fontWeight: 600,
                      paddingRight: '8px'
                    }}>
                      {rec.name}
                    </Typography>
                    <img src={star} />
                  </Box>

                  <Typography sx={{
                    color: 'var(--petroleum-p-45, #93A5B4)', fontFamily: 'Public Sans',
                    fontSize: '13px',
                    fontStyle: 'normal',
                    fontWeight: 400
                  }}>{rec.companyName}</Typography>
                </Box>
              </Grid>
              <Grid item>
                <Typography sx={{
                  color: '#000', fontFamily: 'Inter',
                  fontSize: '14px',
                  fontStyle: 'normal',
                  fontWeight: 400
                }}>Moderator</Typography>
              </Grid>
              <Grid item>
                <Typography sx={{
                  color: '#000', fontFamily: 'Inter',
                  fontSize: '14px',
                  fontStyle: 'normal',
                  fontWeight: 400
                }}>Lead Software Engineer</Typography>
              </Grid>
              <Grid item>
                <svg style={{paddingRight:'6px'}} xmlns="http://www.w3.org/2000/svg" width="7" height="7" viewBox="0 0 7 7" fill="none">
                  <circle cx="3.83203" cy="3.5" r="3" fill="#52C41A" />
                </svg>
                 3 Matches
              </Grid>
              <Grid item>
                <img src={more} />
              </Grid>
            </Grid>
           
          </CardContent>
           <Box sx={{display:'flex'}}>
           <Typography sx={{
               color: 'var(--character-title, #262626)var(--character-title, #262626)', fontFamily: 'Public Sans',
               fontSize: '15px',
               fontStyle: 'normal',
               fontWeight: 400,
               border: '1px solid var(--day-5, #D9D9D9)',
               background:' var(--day-1, #FFF)',
               borderRadius: '8px',
               padding:"4px 16px",
               marginRight:'12px'

             }}>Raising Capital</Typography>
           <Typography sx={{
               color: 'var(--character-title, #262626)var(--character-title, #262626)', fontFamily: 'Public Sans',
               fontSize: '15px',
               fontStyle: 'normal',
               fontWeight: 400,
               border: '1px solid var(--day-5, #D9D9D9)',
               background:' var(--day-1, #FFF)',
               borderRadius: '8px',
               padding:"4px 16px"
             }}>Entrepreneurship</Typography>
         </Box>
           <Box sx={{display:'flex', marginTop:'12px'}}>
           <Typography sx={{
               color: 'var(--character-title, #262626)var(--character-title, #262626)', fontFamily: 'Public Sans',
               fontSize: '15px',
               fontStyle: 'normal',
               fontWeight: 400,
               border: '1px solid var(--day-5, #D9D9D9)',
               background:' var(--day-1, #FFF)',
               borderRadius: '8px',
               padding:"4px 16px",
               marginRight:'12px'
             }}>Electric Vehicles</Typography>
           <Typography sx={{
               color: 'var(--character-title, #262626)var(--character-title, #262626)', fontFamily: 'Public Sans',
               fontSize: '15px',
               fontStyle: 'normal',
               fontWeight: 400,
               border: '1px solid var(--day-5, #D9D9D9)',
               background:' var(--day-1, #FFF)',
               borderRadius: '8px',
               padding:"4px 16px",
               marginRight:'12px'

             }}>CleanTech</Typography>
           <Typography sx={{
               color: 'var(--character-title, #262626)var(--character-title, #262626)', fontFamily: 'Public Sans',
               fontSize: '15px',
               fontStyle: 'normal',
               fontWeight: 400,
               border: '1px solid var(--day-5, #D9D9D9)',
               background:' var(--day-1, #FFF)',
               borderRadius: '8px',
               padding:"4px 16px"
             }}>Venture Capital</Typography>
         </Box>
         </Box>
        ))}



      </Card>
      {selectedUser && (
        <UserProfileSidePanel user={selectedUser} isOpen={true} onClose={() => setSelectedUser(null)} />
      )}
    </>
  )
}

export default FindMember
