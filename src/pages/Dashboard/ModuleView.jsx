import React from 'react';
import { Avatar, Box, Chip, Grid, Typography } from '@mui/material';
import media from 'assets/images/media.png';
import youtube from 'assets/icons/youtube.png';
import doc from 'assets/icons/docs.svg';
import event from 'assets/icons/eventbrite.png';
import libraryStyles from 'styles/components/libraryStyles';
import common from "components/common";

const ModuleView = (data) => {
    const classes = libraryStyles();


    return (
        <>
            <Grid container spacing={2} padding={'0.75rem 1.5rem'}>
                {data.data.map((rec, index) => (
                    <>
                        <Grid item xs={12} sm={6} md={4} lg={4} mt={'1.25rem'}>
                            <Box>
                                <div className='relative-full-width'>
                                    <common.Img src={rec.img} className={classes.moduleContentImg} />
                                    <div className={classes.moduleContentSource}>
                                        {rec.source == 'youtube' && <common.Img src={youtube} />}
                                        {rec.source == 'eventbrite' && <common.Img src={event} />}
                                        {rec.source == 'docs' && <common.Img src={doc} />}
                                    </div>
                                </div>

                                <Box className="flex-container" mt={'12px'}>
                                    <Grid container>
                                        <Grid item xs={11}>
                                            <Typography sx={{ fontWeight: 600 }} align='left'>
                                                {rec.title}
                                            </Typography>
                                            <Box className={classes.flexStart}>
                                                {rec.tags.length > 0 && (
                                                    <Chip
                                                        label={rec.tags[0]} // Accessing the first tag
                                                        className={classes.moduleContentChip}
                                                    />
                                                )}
                                            </Box>
                                        </Grid>
                                        <Grid item xs={1}>
                                            <Avatar src={rec.profile} alt="Media" className={classes.moduleContentAvatar}>
                                            </Avatar>
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
