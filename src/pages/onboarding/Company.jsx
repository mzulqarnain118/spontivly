import { Container, MenuItem, Select, TextField, Typography } from '@mui/material';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {
  setCompanyName,
  setPosition,
  setStage,
} from '../../redux/companySlice';

import { useTheme } from '@mui/material/styles';
import companyStyles from '../../styles/components/companyStyles';
function Company() {

  const dispatch = useDispatch();
  const { companyName, position, stage } = useSelector((state) => state.company);
  const theme = useTheme();
  const classes = companyStyles();

  const stages = [
    'Startup',
    'Growth Stage',
    'Established',
    'Maturity Stage',
    'Decline/Turnaround',
    'Exit Stage',
    'Post-Exit Stage',
  ];
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    dispatch(setStage(event.target.value));
  };
  return (
    <>
      <Typography className={classes.heading}>Tell us about your company</Typography>


      <Container className={classes.mainContainer}>
        <TextField
          variant="outlined"
          placeholder="Company name"
          value={companyName}
          onChange={(e) => {
            const query = e.target.value;
            dispatch(setCompanyName(query));
          }}
          className={classes.searchInput}
          sx={{
            [theme.breakpoints.up('md')]: {
              width: '30vw', // Adjust width for screens wider than 'md' breakpoint
            },

          }}
        />
        <TextField
          variant="outlined"
          placeholder="Your Position"
          value={position}
          onChange={(e) => {
            const query = e.target.value;
            dispatch(setPosition(query));
          }}
          className={classes.searchInput}
          sx={{
            [theme.breakpoints.up('md')]: {
              width: '30vw', // Adjust width for screens wider than 'md' breakpoint
            },

          }}
        />
        <Select
          value={stage}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          className={classes.select}
          sx={{
            [theme.breakpoints.up('md')]: {
              width: '30vw', // Adjust width for screens wider than 'md' breakpoint
            },

          }}
        >
          <MenuItem value="">
            <em>Select company stage</em>
          </MenuItem>
          {stages.map((stage, index) => (
            <MenuItem key={index} value={stage}>
              {stage}
            </MenuItem>
          ))}
        </Select>
      </Container>
    </>
  )
}

export default React.memo(Company)
