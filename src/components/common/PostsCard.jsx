import { Avatar, Box, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import React from 'react';
import profile from 'assets/images/profile.jpg';
import atom from 'assets/images/atom.png';
import like from 'assets/icons/like.svg';
import comment from 'assets/icons/comment.svg';

function PostsCard({post}) {
    return (
        <Card sx={{ p: 0, border: '1px solid var(--petroleum-p-15, #E9EDF0)', boxShadow: 'none', marginTop: '20px',borderRadius:'8px' }}>
            <CardContent>
                <Grid container alignItems="center" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Grid item>
                        <Avatar src={profile}>
                            {/* User Avatar */}
                        </Avatar>
                    </Grid>
                    <Grid item xs={12} sm={11}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: 1 }}>
                            <Typography variant="h6" sx={{ color: 'black' }}>
                                {post.name}
                            </Typography>
                            <Typography sx={{ color: 'var(--character-secondary, #8C8C8C)' }}>{post.companyName}</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </CardContent>
            <CardContent>
                <Typography sx={{
                    color: 'var(--brand-complimentary, #323E48)',
                    
                    fontSize: '18px',
                    fontStyle: 'normal',
                    fontWeight: 600,
                }}>
                    {post.title}
                </Typography>
                <Typography sx={{
                    color: 'var(--brand-complimentary, #323E48)',
                    
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: 400,
                }}>
                    {post.description}
                </Typography>
            </CardContent>
            <CardContent>
                <img src={atom} />
            </CardContent>
            <CardContent>
                <Divider />
            </CardContent>
            <CardContent>
                <Grid container alignItems="center" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Grid item>
                        <Box sx={{ display: 'flex' }}>
                            <img src={like} style={{marginRight:'11px'}} />
                            <Typography sx={{
                                color: 'var(--petroleum-p-45, #93A5B4)', 
                                fontSize: '16px',
                                fontStyle: 'normal',
                                fontWeight: 400,
                                marginRight: '20px', 
                            }}> 0 Likes</Typography>
                            <img src={comment} style={{marginRight:'11px'}} />
                            <Typography sx={{
                                color: 'var(--petroleum-p-45, #93A5B4)', 
                                fontSize: '16px',
                                fontStyle: 'normal',
                                fontWeight: 400,
                            }}> Comment </Typography>
                        </Box>

                    </Grid>
                    <Grid item>
                        <Box sx={{ display: 'flex', marginLeft: 2 }}>
                            <Typography sx={{
                                color: 'var(--petroleum-p-45, #93A5B4)', 
                                fontSize: '16px',
                                fontStyle: 'normal',
                                fontWeight: 400,
                                
                            }}> 0 Comment </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}

export {PostsCard};
