import React from 'react';
import { Avatar, Box, Chip, Divider, Grid, Paper, Typography } from '@mui/material';
import media from 'assets/images/media.png';
import profile from 'assets/images/profile.jpg';
import youtube from 'assets/icons/youtube.png';
import doc from 'assets/icons/docs.svg';
import event from 'assets/icons/eventbrite.png';


const Property1Default1 = (data) => {

    return (
        <>

            {data.data.map((rec, index) => (
                <>
                    <Box sx={{ marginTop: '24px', marginBottom: '24px', display: 'flex', }}>
                        <img src={rec.img} style={{
                            marginRight: '24px',
                            maxWidth: '98px',
                            maxHeight: '98px'
                        }} />

                        <Grid container>
                            <Grid item xs={10}>
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography sx={{
                                        color: 'color: var(--petroleum-p-100, #2D3840)', 
                                        fontSize: '16px',
                                        fontStyle: 'normal',
                                        fontWeight: 600,
                                        marginBottom: '4px'
                                    }}>
                                        {rec.title}
                                    </Typography>
                                    {/* <Grid item xs={10}> */}
                                    <Typography sx={{
                                        color: ' var(--petroleum-p-60, #698296)', 
                                        fontSize: '14px',
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        marginBottom: '4px'

                                    }}>
                                        {rec.description}
                                    </Typography>
                                    {/* </Grid> */}
                                    <Box sx={{ display: 'flex', marginBottom: '4px' }}>
                                        <Avatar src={rec.profile} alt="Media" sx={{ marginRight: '4px', maxWidth: '20px', maxHeight: '20px' }}>
                                        </Avatar>
                                        <Typography sx={{
                                            color: 'var(--petroleum-p-100, #2D3840', 
                                            fontSize: '12px',
                                            fontStyle: 'normal',
                                            fontWeight: 400
                                        }}>
                                            {rec.author}
                                        </Typography>
                                    </Box>

                                    <Box sx={{ display: 'flex' }}>
                                        {rec.tags.map((tag, index) => (
                                            <Chip label={tag} sx={{
                                                marginTop: '4px',
                                                borderRsdius: '5px',
                                                border: '1px solid var(--petroleum-p-15, #E9EDF0)',
                                                background: '#FFF',
                                                padding: '3px 10px',
                                                marginRight: '8px'
                                            }} />
                                        ))}
                                    </Box>



                                </Box>
                            </Grid>



                            <Grid item xs={2} container display="flex" flexDirection="column" alignItems="center" justifyContent="space-between">

                                <Typography sx={{
                                    color: 'var(--petroleum-p-60, #698296)',
                                    fontSize: '12px',
                                    fontStyle: 'normal',
                                    fontWeight: 400
                                }}>
                                    {rec.date}
                                </Typography>
                                {rec.source == 'youtube' && <img src={youtube} />}
                                {rec.source == 'eventbrite' && <img src={event} />}
                                {rec.source == 'docs' && <img src={doc} />}

                                {/* <Typography sx={{
                                    color: 'var(--petroleum-p-100, #2D3840', 
                                    fontSize: '2px',
                                    fontStyle: 'normal',
                                    fontWeight: 400
                                }}>
                            {rec.date}
                        </Typography> */}
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
