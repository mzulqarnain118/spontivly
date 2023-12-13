import React from "react";
import { Avatar, Box, Chip, Grid, Typography } from "@mui/material";
import libraryStyles from "styles/components/libraryStyles";
import common from "components/common";
import defaultThumbnail from "assets/images/dummy.png";

  export const handleLibraryItemClick = (url,type) => {
      if (type === "pdf") {
        const newTab = window.open();
        newTab.document.write(
          '<iframe src="' +
            url +
            '" style="width:100%; height:100vh; border:none;"></iframe>'
        );
      } else {
        window.open(url, "_blank");
      }
  };
const LibraryContent = ({ libraryData, typeIcons }) => {
  const classes = libraryStyles();

  return (
    <>
      {libraryData?.map((library) => (
        <Box
          key={library.id}
          className={`${classes.mainBox} cursor`}
          onClick={() => handleLibraryItemClick(library.url, library.type)}
        >
          <common.Img src={defaultThumbnail} className={classes.contentImg} />
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
                    src={
                      library?.created_by?.profile?.profile_pic ??
                      defaultThumbnail
                    }
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
              <common.Img src={typeIcons[library?.type]} />
            </Grid>
          </Grid>
        </Box>
      ))}
    </>
  );
};

export default LibraryContent;
