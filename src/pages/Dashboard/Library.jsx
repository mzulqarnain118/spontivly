import React,{useState} from 'react'
import Property1Default1 from '../../components/common/Property1Default1'
import { Button, Card, Divider, FormControl, Grid, InputLabel, MenuItem, Select, Switch, TextField, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import ToggleButtons from '../../components/common/ToggleButtons';
import filter from 'assets/icons/filter.svg'
import ModuleView from '../../components/common/ModuleView';
import profile from 'assets/images/profile.jpg';
import avenger from 'assets/images/avenger.png';
import superheros from 'assets/images/superheros.jpeg';
import superpower from 'assets/images/super.png';
import dummy from 'assets/images/dummy.png';

function Library() {
  const [view, setView] = useState('list');
  console.log("Library",view)

  const data = [
    {
      title: "Hand-to-Hand Combat Techniques for Superheroes",
      description: "A comprehensive guide to mastering hand-to-hand combat for various skill levels.",
      author: "Steve Rogers",
      date: "Jan 5, 2023",
      source: 'docs',
      profile: profile,

      tags: [
        "Combat Training",
        "Non-LethalCombat",
        "TeamworkExercises"
      ],
      img: superheros,
    },
    {
      title: "Mastering Your Superpowers",
      description: "A video series that provides tips and exercises for controlling and enhancing your superpowers.",
      author: "Stephen Strange",
      date: "Jan 5, 2023",
      source: 'youtube',
      profile: profile,

      tags: [
      ],
      img: superpower,
    },
    {
      title: "Avengers Assemble: Team Building Activities",
      description: "A collection of team-building exercises designed to improve communication and collaboration among ...",
      author: "Nick Fury",
      date: "Jan 5, 2023",
      source: 'youtube',
      profile: profile,
      tags: [
        "Combat Training",
        "Non-LethalCombat",
        "TeamworkExercises"
      ],
      img: avenger,
    },
    {
      title: "Avengers Assemble: Team Building Activities",
      description: "A collection of team-building exercises designed to improve communication and collaboration among ...",
      author: "Nick Fury",
      date: "Jan 5, 2023",
      source: 'youtube',
      profile: profile,
      tags: [
        "Combat Training",
        "Non-LethalCombat",
        "TeamworkExercises"
      ],
      img: dummy,
    },
    {
      title: "Avengers Assemble: Team Building Activities",
      description: "A collection of team-building exercises designed to improve communication and collaboration among ...",
      author: "Nick Fury",
      date: "Jan 5, 2023",
      source: 'eventbrite',
      profile: profile,
      tags: [
        "Combat Training",
        "Non-LethalCombat",
        "TeamworkExercises"
      ],
      img: dummy,
    },

  ]
  return (
    <>
      <Card sx={{ p: 0, border: '1px solid var(--petroleum-p-15, #E9EDF0)', boxShadow: 'none', borderRadius: '8px', padding: '20px' }}>
        <Grid container spacing={1} sx={{ marginBottom: '20px' }}>
          <Grid item xs={6} sx={{ pr: 1 }}> {/* Add padding on the right side */}
            <TextField
              fullWidth
              variant="outlined"
              type="text"
              InputProps={{
                startAdornment:
                  <SearchIcon />
              }}
              placeholder="Search library"
              sx={{
                background: 'var(--petroleum-p-05, #F9FBFD)',
                borderRadius: '8px',
              }}
            />
          </Grid>
          <Grid item xs={3}>
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
          <Grid item xs={1.5}>
            <ToggleButtons setView={setView} view={view} />

          </Grid>
          <Grid item xs={1}>
            <Button sx={{ border: ' 1.5px solid var(--petroleum-p-100, #2D3840)', height: '100%', borderRadius: '6px' }}> <img src={filter} /> </Button>

          </Grid>
        </Grid>
        <Typography sx={{
          color: 'var(--petroleum-p-60, #698296)', fontFamily: 'Public Sans',
          fontSize: '12px',
          fontStyle: 'normal',
          fontWeight: 600,
          marginBottom: '8px'
        }} >Most RECENT</Typography>
        <Divider></Divider>
        {view === 'list' ? <Property1Default1 data={data} /> : <ModuleView data={data} />}


      </Card>
    </>
  )
}

export default Library
