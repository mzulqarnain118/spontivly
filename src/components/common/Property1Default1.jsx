import React from 'react';
import { Avatar, Box, Chip, Divider, Grid, Typography } from '@mui/material';
import youtube from 'assets/icons/youtube.png';
import doc from 'assets/icons/docs.svg';
import event from 'assets/icons/eventbrite.png';

const Property1Default1 = (data) => {

    return (
      <>
        {data.data.map((rec, index) => (
          <>
            <Box
              sx={{ marginTop: "24px", marginBottom: "24px", display: "flex" }}
            >
              <img
                src={rec.img}
                style={{
                  marginRight: "24px",
                  maxWidth: "98px",
                  maxHeight: "98px",
                }}
              />

              <Grid container>
                <Grid item xs={10}>
                  <Box className="col-start gap-025">
                    <Typography sx={{ fontWeight: 600 }}>
                      {rec.title}
                    </Typography>
                    <Typography variant="lightSubtitle1">
                      {rec.description}
                    </Typography>
                    <Box className="flex">
                      <Avatar
                        src={rec.profile}
                        alt="Media"
                        sx={{
                          marginRight: "4px",
                          maxWidth: "20px",
                          maxHeight: "20px",
                        }}
                      ></Avatar>
                      <Typography variant="subtitle2">
                        {rec.author}
                      </Typography>
                    </Box>

                    <Box className="row-start gap-05">
                      {rec.tags.map((tag, index) => (
                        <Chip
                          label={tag}
                          sx={{
                            border: "1px solid var(--petroleum-p-15, #E9EDF0)",
                            padding: "3px 10px",
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                </Grid>

                <Grid
                  item
                  xs={2}
                  container
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="lightSubtitle2">
                    {rec.date}
                  </Typography>
                  {rec.source == "youtube" && <img src={youtube} />}
                  {rec.source == "eventbrite" && <img src={event} />}
                  {rec.source == "docs" && <img src={doc} />}
                </Grid>
              </Grid>
            </Box>

            <Divider></Divider>
          </>
        ))}
      </>
    );
};

export default Property1Default1;
