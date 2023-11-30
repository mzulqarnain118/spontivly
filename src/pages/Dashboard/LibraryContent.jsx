import React from 'react';
import { Avatar, Box, Chip, Grid, Typography } from '@mui/material';
import youtube from 'assets/icons/youtube.png';
import doc from 'assets/icons/docs.svg';
import event from 'assets/icons/eventbrite.png';
import libraryStyles from 'styles/components/libraryStyles';
import common from "components/common";

const LibraryContent = (data) => {
  const classes = libraryStyles();

  return (
    <>
      {data.data.map((rec, index) => (
        <>
          <Box className={classes.mainBox}>
            <common.Img src={rec.img} className={classes.contentImg} />


            <Grid container>
              <Grid item xs={10} sm={10} md={10}>
                <Box className="col-start gap-025">
                  <Typography sx={{ fontWeight: 600 }} align='left'>
                    {rec.title}
                  </Typography>
                  <Typography variant="lightSubtitle1" align='left'>
                    {rec.description}
                  </Typography>
                  <Box className="flex">
                    <Avatar
                      src={rec.profile}
                      alt="Media"
                      className={classes.contentAvatar}
                    ></Avatar>
                    <Typography variant="subtitle2">
                      {rec.author}
                    </Typography>
                  </Box>

                  <Box className={classes.flexStart}>
                    {rec.tags.map((tag, index) => (
                      <Chip
                        label={tag}
                        className={classes.contentChip}
                      />
                    ))}
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={2} className='col-between'>
                <Typography variant="lightSubtitle2">
                  {rec.date}
                </Typography>
                {rec.source == 'youtube' && <common.Img src={youtube} />}
                {rec.source == 'eventbrite' && <common.Img src={event} />}
                {rec.source == 'docs' && <common.Img src={doc} />}
              </Grid>
            </Grid>
          </Box>
        </>
      ))}
    </>
  );
};

export default LibraryContent;
