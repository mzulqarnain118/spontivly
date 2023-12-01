import React, { useEffect } from "react";
import { Avatar, Box, Chip, Grid, Typography } from '@mui/material';
import youtube from 'assets/icons/youtube.png';
import doc from 'assets/icons/docs.svg';
import event from 'assets/icons/eventbrite.png';
import libraryStyles from 'styles/components/libraryStyles';
import common from "components/common";

const LibraryContent = (data) => {

  // useEffect(() => {
  //    console.log(data?.length,data);
  //     data.length !== 0 && data?.map((item) => console.log(item?.id));
  //  }, []);
  const classes = libraryStyles();

  return (
    <>
      {/* {data.length!==0 && data?.map((library) => (
        <>
          <Box key={library.id} className={classes.mainBox}>
            <common.Img src={library.url} className={classes.contentImg} />

            <Grid container>
              <Grid item xs={10} sm={10} md={10}>
                <Box className="col-start gap-025">
                  <Typography sx={{ fontWeight: 600 }} align="left">
                    {library.title}
                  </Typography>
                  <Typography variant="lightSubtitle1" align="left">
                    {library.description}
                  </Typography>
                  <Box className="flex">
                    <Avatar
                      src={library?.profile}
                      className={classes.contentAvatar}
                    />
                    <Typography variant="subtitle2">
                      {library.author}
                    </Typography>
                  </Box>

                  <Box className={classes.flexStart}>
                    {library.tags.map((tag, index) => (
                      <Chip label={tag} className={classes.contentChip} />
                    ))}
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={2} className="col-between">
                <Typography variant="lightSubtitle2">{library.date}</Typography>
                {library.type == "youtube" && <common.Img src={youtube} />}
                {library.type == "eventbrite" && <common.Img src={event} />}
                {library.type == "docs" && <common.Img src={doc} />}
              </Grid>
            </Grid>
          </Box>
        </>
      ))} */}
    </>
  );
};

export default LibraryContent;
