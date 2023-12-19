import { Box, Container, Typography } from '@mui/material'
import React, { memo } from 'react'
import { useQuery } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import locationIcon from '../../assets/icons/location.png'
import { Controls as common } from '../../components/common'
import { setLocationText, setSelectedLocation } from '../../redux/locationSlice'
import { commonStyles } from '../../styles/commonStyles'
import { locationStyles } from '../../styles/components/locationStyles'
import { ApiCall, encodeParams } from '../../utils'

function LocationComponent() {
  const classes = commonStyles()
  const locationClasses = locationStyles()
  const dispatch = useDispatch()
  const { searchText } = useSelector((state) => state.location)

  const fetchLocation = async (name) => {
    const encodedName = encodeParams({ name })
    const api_url = `locations/?${encodedName}`
    const locations = await ApiCall(api_url)

    return locations?.results
  }

  const { data: locations, isLoading } = useQuery(['locations', searchText], () => fetchLocation(searchText))

  const handleSelect = (name, state, id) => {
    dispatch(setLocationText(`${name},${state}`))
    dispatch(setSelectedLocation(id))
  }

  const customHandleClearClick = () => {
    dispatch(setLocationText(''))
    dispatch(setSelectedLocation(null))
  }

  return (
    <>
      <common.FormHeading heading="Where are you located?" title="Tell us what city you’re based in" />
      <Container maxWidth="sm" className={classes.container}>
        <Box className={classes.mainContainer}>
          <common.Input
            placeholder="Search Location"
            value={searchText}
            onChange={(e) => dispatch(setLocationText(e.target.value))}
            customHandleClearClick={customHandleClearClick}
            startIcon={true}
            endIcon={true}
          />
        </Box>
      </Container>
      {isLoading && <common.Spinner />}
      {locations?.map((location) => (
        <Box
          key={location?.id} // Add a key to the mapped elements
          className={locationClasses.container}
          onClick={() => handleSelect(location?.name, location?.state.name, location?.id)}
        >
          <common.Img src={locationIcon} className={locationClasses.image} />
          <Box className={locationClasses.content}>
            <Typography>{location?.name}</Typography>
            <Typography>{location?.state.name}</Typography>
          </Box>
        </Box>
      ))}
    </>
  )
}

export const Location = memo(LocationComponent)
