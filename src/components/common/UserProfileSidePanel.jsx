import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import Avatar from '@mui/material/Avatar';
import profile from 'assets/images/profile.jpg';
import twitter from 'assets/icons/twitter-square.svg';
import fb from 'assets/icons/facebook.svg';
import linkedin from 'assets/icons/linkedin.svg';
import { Box, Button, Card, CardContent, Chip, Divider, Grid, Modal, Typography } from '@mui/material';

const UserProfileSidePanel = ({ user, isOpen, onClose }) => {
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };
    return (
        <>
            <Drawer anchor="right" PaperProps={{
                sx: { width: '17.71vw' }
            }} open={isOpen} onClose={onClose} sx={{ padding: '20px' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '48px' }}>
                    <Avatar src={profile} alt={user.name} sx={{ width: '3.33vw', height: '3.33vw' }} />
                    <Typography sx={{
                        color: ' var(--day-primary, #262626)', fontFamily: 'Public Sans',
                        fontSize: '20px',
                        fontStyle: 'normal',
                        fontWeight: 600,
                        marginTop: '16px'
                    }}>{user.name}</Typography>
                    <Typography sx={{
                        color: 'var(--petroleum-p-45, #93A5B4)', fontFamily: 'Public Sans',
                        fontSize: '14px',
                        fontStyle: 'normal',
                        fontWeight: 400,
                    }}>scott@xconsecurity.com</Typography>
                    <Box sx={{ display: 'flex' }}>
                        <img src={twitter} style={{ marginRight: '1.04vw' }} />
                        <img src={fb} style={{ marginRight: '1.04vw' }} />
                        <img src={linkedin} />
                    </Box>
                    <Button fullWidth size='sm' sx={{
                        padding: ' 6px 20px', borderRadius: '4px',
                        border: ' 1px solid var(--petroleum-p-45, #93A5B4)',
                        background: '#FFF', marginTop: '16px', marginBottom: '16px',
                        color: 'var(--petroleum-p-100, #2D3840)', fontFamily: 'Public Sans',
                        fontSize: '14px',
                        fontStyle: 'normal',
                        fontWeight: 600,
                    }} onClick={openModal}>View Full Profile</Button>
                </Box>
            </Drawer>
            <Modal open={isModalOpen} onClose={closeModal} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>

                <Card sx={{ padding: '20px', maxWidth: '583px' }}>
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography sx={{
                                    color: ' var(--petroleum-p-60, #698296)', fontFamily: 'Public Sans',
                                    fontSize: '15px',
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                }}>
                                    About
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography sx={{
                                    color: 'var(--day-title, #262626)', fontFamily: 'Public Sans',
                                    fontSize: '14px',
                                    fontStyle: 'normal',
                                    fontWeight: 400,
                                }}>
                                    As an experienced HR Manager in Florida, I bring over a decade of
                                    expertise in developing and implementing strategic HR initiatives to
                                    support organizational growth and employee engagement. My passion
                                    for creating positive work cultures is evident in my ability to lead
                                    HR departments, foster collaboration between cross-functional teams,
                                    and ensure compliance with state and federal labor laws. My
                                    strengths include
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <Divider></Divider>
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <Typography sx={{
                                    color: 'var(--petroleum-p-60, #698296)',
                                    fontFamily: 'Public Sans',
                                    fontSize: '15px',
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                }}>
                                    Education
                                </Typography>
                                <Typography variant="body2">
                                    Graduated
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography sx={{
                                    color: 'var(--petroleum-p-60, #698296)',
                                    fontFamily: 'Public Sans',
                                    fontSize: '15px',
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                }}>
                                    Gender
                                </Typography>
                                <Typography variant="body2">
                                    Female
                                </Typography>
                            </Grid>
                            <Divider></Divider>
                            <Grid item xs={12} md={6}>
                                <Typography sx={{
                                    color: 'var(--petroleum-p-60, #698296)',
                                    fontFamily: 'Public Sans',
                                    fontSize: '15px',
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                }}>
                                    Age
                                </Typography>
                                <Typography variant="body2">
                                    34
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography sx={{
                                    color: 'var(--petroleum-p-60, #698296)',
                                    fontFamily: 'Public Sans',
                                    fontSize: '15px',
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                }}>
                                    Profession
                                </Typography>
                                <Typography variant="body2">
                                    HR Manager in Pharmacy industry
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>

                    <CardContent>

                        <Typography sx={{
                            color: 'var(--petroleum-p-60, #698296)', fontFamily: 'Public Sans',
                            fontSize: '15px',
                            fontStyle: 'normal',
                            fontWeight: 600,
                        }}>
                            Interests tags
                        </Typography>
                        <Chip sx={{
                            color:'var(--character-title, #262626)',
                            border: '1px solid var(--day-5, #D9D9D9)',
                            borderRadius: '8px',
                            marginRight:'12px',
                            marginTop:'16px',
                            padding:'16px'

                        }} label="Food" variant="outlined" />

                        <Chip sx={{
                            border: '1px solid var(--day-5, #D9D9D9)',
                            borderRadius: '8px',
                            marginRight:'12px',
                            padding:'16px'


                        }} label="Entrepreneurship" variant="outlined" />

                        <Chip sx={{
                            border: '1px solid var(--day-5, #D9D9D9)',
                            borderRadius: '8px',
                            padding:'16px',
                            marginRight:'12px',


                        }} label="Travel" variant="outlined" />

                        <Chip sx={{
                            border: '1px solid var(--day-5, #D9D9D9)',
                            borderRadius: '8px',
                            marginRight:'12px',
                            padding:'16px'


                        }} label="Innovation" variant="outlined" />

                        <Chip sx={{
                            border: '1px solid var(--day-5, #D9D9D9)',
                            borderRadius: '8px',
                            marginRight:'12px',
                            padding:'16px',
                            marginTop:'16px',



                        }} label="Wellness" variant="outlined" />

                        <Chip sx={{
                            border: '1px solid var(--day-5, #D9D9D9)',
                            borderRadius: '8px',
                            marginRight:'12px',
                            padding:'16px'


                        }} label="Community" variant="outlined" />


                        <Chip sx={{
                            border: '1px solid var(--day-5, #D9D9D9)',
                            borderRadius: '8px',
                            marginRight:'12px',
                            padding:'16px'


                        }} label="Art" variant="outlined" />

                        <Chip sx={{
                            border: '1px solid var(--day-5, #D9D9D9)',
                            borderRadius: '8px',
                            marginRight:'12px',
                            padding:'16px'



                        }} label="Design" variant="outlined" />

                        <Chip sx={{
                            border: '1px solid var(--day-5, #D9D9D9)',
                            borderRadius: '8px',
                            marginRight:'12px',
                            padding:'16px',
                            marginTop:'16px',




                        }} label="Fitness" variant="outlined" />

                        <Chip sx={{
                            border: '1px solid var(--day-5, #D9D9D9)',
                            borderRadius: '8px',
                            marginRight:'12px',
                            padding:'16px'


                        }} label="Fashion" variant="outlined" />



                    </CardContent>
                </Card>
            </Modal>
        </>
    );
};

export default UserProfileSidePanel;
