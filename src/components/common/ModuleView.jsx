import React from 'react';
import { Avatar, Box, Chip, Grid, Typography } from '@mui/material';
import media from 'assets/images/media.png';
import youtube from 'assets/icons/youtube.png';
import doc from 'assets/icons/docs.svg';
import event from 'assets/icons/eventbrite.png';

const ModuleView = (data) => {


    return (
        <>
            <Grid container spacing={2}>
                {data.data.map((rec, index) => (
                    <>
                        <Grid item xs={4}>
                            <Box sx={{ marginTop: '24px' }}>
                                <div style={{ position: 'relative', width: '100%' }}>
                                    <img src={rec.img} style={{
                                        width: '100%',
                                        height: '167px',
                                        borderRadius: '8px'
                                    }} />
                                    <div style={{
                                        position: 'absolute',
                                        bottom: '10px',  // Adjust bottom margin
                                        left: '8px',    // Adjust left margin
                                        display: 'flex',
                                        alignItems: 'center',
                                        borderRadius: ' 4px',
                                        border: '1px solid var(--petroleum-p-15, #E9EDF0)',
                                        background: '#F7F7F7',
                                        padding: '4px'
                                    }}>
                                        {rec.source == 'youtube' && <img src={youtube} />}
                                        {rec.source == 'eventbrite' && <img src={event} />}
                                        {rec.source == 'docs' && <img src={doc} />}
                                    </div>
                                </div>

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px' }}>
                                    <Grid container>
                                        <Grid item xs={11}>
                                            <Typography sx={{
                                                color: 'color: var(--petroleum-p-100, #2D3840)', fontFamily: 'Public Sans',
                                                fontSize: '16px',
                                                fontStyle: 'normal',
                                                fontWeight: 600,
                                                marginBottom: '8px'
                                            }}>
                                                {rec.title}
                                            </Typography>
                                            {rec.tags.length > 0 && (
                                                <Chip
                                                    label={rec.tags[0]} // Accessing the first tag
                                                    sx={{
                                                        marginTop: '4px',
                                                        borderRadius: '5px', // Corrected the typo
                                                        border: '1px solid var(--petroleum-p-15, #E9EDF0)',
                                                        background: '#FFF',
                                                        padding: '3px 10px',
                                                        marginRight: '8px',
                                                    }}
                                                />
                                            )}

                                        </Grid>
                                        <Grid item xs={1}>
                                            <Avatar src={rec.profile} alt="Media" sx={{ maxWidth: '20px', maxHeight: '20px' }}>
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
