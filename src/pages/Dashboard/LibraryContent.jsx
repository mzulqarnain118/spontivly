import React from "react";
import { Avatar, Box, Chip, Grid, Typography } from "@mui/material";
import youtube from "assets/icons/youtube.png";
import doc from "assets/icons/docs.svg";
import event from "assets/icons/eventbrite.png";
import libraryStyles from "styles/components/libraryStyles";
import common from "components/common";
import superheros from "assets/images/superheros.jpeg";

const LibraryContent = ({ libraryData }) => {
  const classes = libraryStyles();

  return (
    <>
      {libraryData?.map((library) => (
        <>
          <Box key={library.id} className={classes.mainBox}>
            <common.Img src={superheros} className={classes.contentImg} />
            <Grid container>
              <Grid item xs={10} sm={10} md={10}>
                <Box className="col-start gap-025">
                  <Typography sx={{ fontWeight: 600 }} align="left">
                    {library.title}
                  </Typography>
                  <Typography
                    variant="lightSubtitle1"
                    align="left"
                    dangerouslySetInnerHTML={{ __html: library.description }}
                  />
                  <Box className="flex">
                    <Avatar
                      src={library?.profile}
                      alt="Media"
                      className={classes.contentAvatar}
                    />
                    <Typography variant="subtitle2">
                      {`${library.created_by.first_name} ${library.created_by.last_name}`}
                    </Typography>
                  </Box>

                  <Box className={classes.flexStart}>
                    {library.tags.map((tag) => (
                      <Chip
                        key={tag.title}
                        label={tag.title}
                        className={classes.contentChip}
                      />
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
      ))}
    </>
  );
};

export default LibraryContent;
