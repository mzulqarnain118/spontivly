import React from "react";
import { Avatar, Box, Chip, Grid, Typography } from "@mui/material";
import libraryStyles from "styles/components/libraryStyles";
import common from "components/common";
import defaultThumbnail from "assets/images/dummy.png";
import { handleLibraryItemClick } from "./LibraryContent";

const ModuleView = ({ libraryData, typeIcons }) => {
  const classes = libraryStyles();

  return (
    <Grid container spacing={2} padding={"0.75rem 1.5rem"}>
      {libraryData?.map((library) => (
        <Grid
          key={library.id}
          item
          xs={12}
          sm={6}
          md={4}
          lg={4}
          mt={"1.25rem"}
          className="cursor"
          onClick={() => handleLibraryItemClick(library.url, library.type)}
        >
          <Box>
            <div className="relative-full-width">
              <common.Img
                src={defaultThumbnail}
                className={classes.moduleContentImg}
              />
              <div className={classes.moduleContentSource}>
                {typeIcons[library.type] == "youtube" && (
                  <common.Img type="icon" src={typeIcons[library.type]} />
                )}
              </div>
            </div>

            <Box className="flex" mt={"12px"}>
              <Grid container spacing={0.5}>
                <Grid item xs={11} sm={11} md={11} lg={11}>
                  <Typography sx={{ fontWeight: 600 }} align="left">
                    {library.title}
                  </Typography>
                  <Box
                    className="flex"
                    sx={{
                      alignItems: "flex-start",
                      gap: "0.625rem",
                      maxHeight: "80px", // Adjust the height accordingly
                      overflowY: "auto", // Make it scrollable
                    }}
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
                    src={
                      library?.created_by?.profile?.profile_pic ??
                      defaultThumbnail
                    }
                    className={classes.moduleContentAvatar}
                  />
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default ModuleView;
