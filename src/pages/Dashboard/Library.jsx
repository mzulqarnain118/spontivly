import React, { useState } from 'react'
import {Card, Grid, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import ToggleButtons from '../../components/common/ToggleButtons';
import filter from 'assets/icons/filter.svg'
import ModuleView from './ModuleView';
import profile from 'assets/images/profile.jpg';
import avenger from 'assets/images/avenger.png';
import superheros from 'assets/images/superheros.jpeg';
import superpower from 'assets/images/super.png';
import dummy from 'assets/images/dummy.png';
import dashboardStyles from 'styles/components/dashboardStyles';
import common from "components/common";
import AddIcon from '@mui/icons-material/Add';
import CreateContent from './CreateContent';
import FilterLibrary from './FilterLibrary';
import LibraryContent from './LibraryContent';
function Library() {
  const [view, setView] = useState('list');
  const [findContent, setFindContent] = useState({
    content: "",
    sortBy: null,
    favorites: [],
  });

  const [isContentDialogOpen, setContentDialogOpen] = useState(false);
  const [isFilterDialogOpen, setFilterDialogOpen] = useState(false);
  const classes = dashboardStyles();

  const openContentModal = () => {
    setContentDialogOpen(true);
  };
  const closeContentModal = () => {
    setContentDialogOpen(false);
  };
  const openFilterModal = () => {
    setFilterDialogOpen(true);
  };
  const closeFilterModal = () => {
    setFilterDialogOpen(false);
  };

  const data = [
    {
      title: "Hand-to-Hand Combat Techniques for Superheroes",
      description: "A comprehensive guide to mastering hand-to-hand combat for various skill levels.",
      author: "Steve Rogers",
      date: "Jan 5, 2023",
      source: 'docs',
      profile: profile,

      tags: [
        "Combat",
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
  const sortByData = [
    { id: "Most Recent", title: "Most Recent" },
    { id: "Recommendation", title: "Recommendations" },
  ];
  return (
    <>
      <Grid container alignItems="center">
        <Grid item xs={6} sm={8} md={9}>
          <Typography variant="h5" align="left">
            Library
          </Typography>
        </Grid>
        <Grid item xs={6} sm={4} md={3} >
          <common.MuiButton variant="contained"
            size="large" label="Add Content"
            className={classes.addContentButton}
            startIcon={<AddIcon />}
            onClick={openContentModal} />

        </Grid>
      </Grid>

      <Card className={classes.card}>
        <Grid container spacing={3} padding={'20px'}>
          <Grid item xs={12} sm={4.5}  md={6} lg={6} >
            <common.Input
              name="member"
              placeholder="Search members"
              value={findContent.member}
              objOnChange={setFindContent}
              startIcon={true}
            />
          </Grid>

          <Grid item xs={5} sm={3.5} md={3} lg={3.5}>
            <common.Select
              name="sortBy"
              value={findContent.sortBy}
              defaultValue="Sort By"
              objOnChange={setFindContent}
              options={sortByData}
            />
          </Grid>
          <Grid item xs={4.5} sm={2.5} md={2} lg={1.5}>
            <ToggleButtons setView={setView} view={view} />

          </Grid>
          <Grid item xs={1} sm={1} md={1} lg={1}>
            <common.MuiButton
              img={filter}
              onClick={openFilterModal}
            />

          </Grid>
        </Grid>

        <Typography  variant="lightSubtitle2" align='left'>MOST RECENT</Typography>
        {view === 'list' ? <LibraryContent data={data} /> : <ModuleView data={data} />}


      </Card>
      <CreateContent isOpen={isContentDialogOpen} onClose={closeContentModal} />
      <FilterLibrary isOpen={isFilterDialogOpen} onClose={closeFilterModal} />
    </>
  )
}

export default Library
