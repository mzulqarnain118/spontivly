import React from 'react'
import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material'
import profile from 'assets/images/profile.jpg';
import star from 'assets/icons/star.svg';

function RecommendationCard() {
    const data = [
        {
            name: "Scott Lang",
            action: "are both interested in",
            purposes: [
                'Climate Change',
                'Quantum Computing'
            ],
        },
        {
            name: "James Rhodes",
            action: "share the objective of",
            purposes: [
                'Hiring / Recruiting'
            ],
        },
        {
            name: "Natasha Romanoff",
            action: "are both interested in",
            purposes: [
                'Defense Technology'
            ],
        }

    ];
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Card sx={{ border: '1px solid var(--petroleum-p-15, #E9EDF0)', boxShadow: 'none', borderRadius: '8px' }}>
                    <CardContent>
                        <Typography sx={{
                            color: 'var(--brand-complimentary, #323E48)',
                            fontFamily: 'Public Sans',
                            fontSize: '18px',
                            fontStyle: 'normal',
                            fontWeight: 600
                        }}>Events</Typography>
                        <Typography variant="body2">This is the content of Card 1.</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} >
                <Card sx={{ border: '1px solid var(--petroleum-p-15, #E9EDF0)', boxShadow: 'none', borderRadius: '8px' , padding:'20px 20px 32px 20px'}}>
                    <CardContent sx={{padding:'0px', pb: 0 }}>
                        <Typography sx={{
                            color: 'var(--brand-complimentary, #323E48)',
                            fontFamily: 'Public Sans',
                            fontSize: '18px',
                            fontStyle: 'normal',
                            fontWeight: 600
                        }}>Recommendations</Typography>
                        {data.map((rec, index) => (
                            <>
                                <Grid container alignItems="center" sx={{ display: 'flex', marginTop: '12px', padding: ' 8px 0px ' }}>
                                    <Grid item>
                                        <Avatar src={profile}>
                                            {/* User Avatar */}
                                        </Avatar>
                                    </Grid>
                                    <Grid item >
                                        <Box sx={{ display: 'flex' }}>
                                            <Typography sx={{
                                                color: 'black', marginLeft: '8px', color: 'var(--petroleum-p-100, #2D3840)',
                                                fontFamily: 'Public Sans',
                                                fontSize: '14px',
                                                fontStyle: 'normal',
                                                fontWeight: 600,
                                                marginRight: '4px'
                                            }}>
                                                {rec.name}
                                            </Typography>
                                            <img src={star} />
                                        </Box>
                                    </Grid>
                                </Grid>
                                <Typography sx={{
                                    color: 'var(--petroleum-p-60, #698296)',
                                    fontFamily: 'Public Sans',
                                    fontSize: '12px',
                                    fontStyle: 'normal',
                                    fontWeight: 400,
                                    display: 'inline'
                                }}>You and {rec.name} {rec.action} <Typography sx={{
                                    color: 'var(--petroleum-p-100, #2D3840)',
                                    fontFamily: 'Public Sans',
                                    fontSize: '12px',
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                    display: 'inline'
                                }}>   {rec.purposes.map((pur, index) => (
                                    <span key={index}>
                                    {index > 0 && index === rec.purposes.length - 1 ? (
                                      <span style={{ color: 'var(--petroleum-p-60, #698296)', fontWeight: 400}}> and </span>
                                    ) : null}
                                    {index > 0 && index < rec.purposes.length - 1 ? ', ' : ''}
                                    {pur}
                                  </span>
                                ))}</Typography></Typography>
                            </>
                        ))}

                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default RecommendationCard
