import React from "react";
import { Avatar, Box, Chip, Grid, Typography } from "@mui/material";
import media from "assets/images/media.png";
import youtube from "assets/icons/youtube.png";
import doc from "assets/icons/docs.svg";
import event from "assets/icons/eventbrite.png";
import libraryStyles from "styles/components/libraryStyles";
import common from "components/common";
import superheros from "assets/images/superheros.jpeg";

const ModuleView = ({ libraryData }) => {
  const classes = libraryStyles();

  return (
    <>
      <Grid container spacing={2} padding={"0.75rem 1.5rem"}>
        {libraryData?.map((library) => (
          <>
            <Grid
              key={library.id}
              item
              xs={12}
              sm={6}
              md={4}
              lg={4}
              mt={"1.25rem"}
            >
              <Box>
                <div className="relative-full-width">
                  <common.Img
                    src={superheros}
                    className={classes.moduleContentImg}
                  />
                  <div className={classes.moduleContentSource}>
                    {library.type == "youtube" && <common.Img src={youtube} />}
                    {library.type == "eventbrite" && <common.Img src={event} />}
                    {library.type == "docs" && <common.Img src={doc} />}
                  </div>
                </div>

                <Box className="flex-container wrap" mt={"12px"}>
                  <Grid container spacing={0.5}>
                    <Grid item xs={11} sm={11} md={11} lg={11}>
                      <Typography sx={{ fontWeight: 600 }} align="left">
                        {library.title}
                      </Typography>
                      <Box
                        className="flex-container wrap"
                        sx={{ alignItems: "flex-start", gap: " 0.625rem " }}
                      >
                        {library.tags.map((tag, index) => (
                          <Chip
                            key={tag.title}
                            label={tag.title}
                            className={classes.moduleContentChip}
                          />
                        ))}
                      </Box>
                    </Grid>
                    <Grid item xs={1}>
                      <Avatar
                        src={library?.profile}
                        className={classes.moduleContentAvatar}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>
          </>
        ))}
      </Grid>
    </>
  );
};

export default ModuleView;
