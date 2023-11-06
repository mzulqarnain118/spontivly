import { Box, Container, Divider, Typography } from '@mui/material';
import React from 'react'
import { setLocationText } from '../../redux/locationSlice'; // Import your action
import commonStyles from '../../styles/commonStyles';
import common from '../../components/common'
import { useSelector } from 'react-redux';
import locationIcon from '../../assets/icons/location.png'
import locationStyles from '../../styles/components/locationStyles';
function Location() {
    const classes = commonStyles();
    const locationClasses = locationStyles();

    const searchText = useSelector((state) => state.location.searchText);
    const locations = useSelector((state) => state.location.locations);

    return (
        <>
            <common.FormHeading
                heading="Where are you located?"
                title="Tell us what city you’re based in"
            />
            <Container className={classes.mainContainer}>
                <common.SearchInput
                    placeholder="Search Location"
                    value={searchText}
                    onChange={setLocationText}
                />
                {locations.map((data, index) => (
                    <>
                        <Box className={locationClasses.container}>
                            <Box className={locationClasses.image}>
                                <img src={locationIcon} loading="lazy"/>
                            </Box>
                            <Box className={locationClasses.content}>
                                <Typography>{data.name}</Typography>
                                <Typography>{data.state_code}</Typography>
                            </Box>

                        </Box>
                    </>
                ))}
            </Container>
        </>
    )
}

export default React.memo(Location)
