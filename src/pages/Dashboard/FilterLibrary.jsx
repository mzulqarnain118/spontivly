import { Box, Card, CardContent, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, Grid, IconButton, Link, Typography } from '@mui/material'
import React, { useState } from 'react'
import ClearIcon from "@mui/icons-material/Clear";
import dashboardStyles from 'styles/components/dashboardStyles';
import common from "components/common";

const FilterLibrary = ({
  isOpen,
  onClose,
  contentTypes,
  selectedTags,
  setSelectedTags,
  selectedTypes,
  setSelectedTypes,
  tags,
}) => {
  const classes = dashboardStyles();
  const handleTagClick = (tagId) => {
     if (selectedTags.includes(tagId)) {
       setSelectedTags(selectedTags.filter((tag) => tag !== tagId));
     } else {
       setSelectedTags([...selectedTags, tagId]);
     }
  };
  const handleClear = () => {
    setSelectedTags([]);
  };
  const handleTypeSelection = (typeId) => {
    if (selectedTypes.includes(typeId)) {
      setSelectedTypes(selectedTypes.filter((type) => type !== typeId));
    } else {
      setSelectedTypes([...selectedTypes, typeId]);
    }
  };
  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="48.75rem">
      <DialogTitle className={classes.filterDialogTitle}>
        <IconButton onClick={onClose}>
          <ClearIcon />
        </IconButton>
        <Typography variant="h6" className={classes.filterDialogTypography}>
          Filters
        </Typography>
      </DialogTitle>
      <DialogContent className={classes.filterDialogContent}>
        <Typography variant="h5" align="left">
          Type
        </Typography>
        <Grid container spacing={2}>
          {contentTypes.map((card, index) => (
            <Grid key={index} item xs={6} sm={6} md={6} lg={3}>
              <common.FilterContentTypeCard
                title={card.title}
                img={card.img}
                selected={selectedTypes.includes(card.id)}
                onClick={() => handleTypeSelection(card.id)}
              />
            </Grid>
          ))}
        </Grid>

        <Typography variant="h5" align="left">
          Tags
        </Typography>
        <div className="col-start">
          <div className="grid-container">
            {tags?.length !== 0 &&
              tags?.map((tag) => (
                <Grid key={tag.id} item xs={6} sm={6} md={6} lg={3}>
                  <FormControl component="fieldset" variant="standard">
                    <FormGroup>
                      <common.Checkbox
                        label={tag.title}
                        key={tag.id}
                        name={tag.name}
                        size="large"
                        onChange={() => handleTagClick(tag.id)}
                        value={selectedTags.includes(tag.id) || false}
                      />
                    </FormGroup>
                  </FormControl>
                </Grid>
              ))}
          </div>
          <Link>Show more</Link>
        </div>
      </DialogContent>
      <DialogActions className={classes.filterDialogActions}>
        <Link onClick={handleClear}>Clear all</Link>
        <common.MuiButton
          size="medium"
          variant="contained"
          label={"Show 100+"}
          minWidth="117px"
        />
      </DialogActions>
    </Dialog>
  );
};

export default FilterLibrary
