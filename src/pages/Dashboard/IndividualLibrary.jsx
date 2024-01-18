import { Avatar, Box, Chip, Grid, Typography } from '@mui/material'
import moment from 'moment'
import React from 'react'
import { useLocation } from 'react-router-dom'
import defaultThumbnail from '../../assets/images/dummy.png'
import { Controls as common } from '../../components/common'
import { libraryStyles } from '../../styles/components/libraryStyles'
import { handleOpenUrlInNewTab, handleShowYoutubeThumbnail } from '../../utils'
import { typeIcons } from './Library'

const IndividualLibrary = () => {
  const classes = libraryStyles()
  const location = useLocation()
  const library = location.state?.library

  return (
    <Grid container spacing={5} padding={'0.75rem 1.5rem'}>
      <Grid key={library.id} item xs={12} sm={6} md={4} lg={4} mt={'1.25rem'} className="cursor" onClick={() => openLibraryInfo(library)}>
        <Box>
          <div className="relative-full-width">
            <common.Img
              src={handleShowYoutubeThumbnail(library.url, library.type) || defaultThumbnail}
              className={classes.moduleContentImg}
            />
            <div className={classes.moduleContentSource}>
              <common.Img type="smallIcon" src={typeIcons[library.type]} />
            </div>
          </div>

          <Box className="flex" mt={'12px'}>
            <Grid container spacing={0.5}>
              <Grid item xs={11} sm={11} md={11} lg={11}>
                <Typography sx={{ fontWeight: 600 }} align="left">
                  {library.title}
                </Typography>
                <Box
                  className="flex"
                  sx={{
                    alignItems: 'flex-start',
                    gap: '0.625rem',
                    maxHeight: '80px', // Adjust the height accordingly
                    overflowY: 'auto' // Make it scrollable
                  }}
                >
                  {library.tags.map((tag, index) => (
                    <Chip key={tag.title} label={tag.title} className={classes.moduleContentChip} />
                  ))}
                </Box>
              </Grid>
              <Grid item xs={1}>
                <Avatar src={library?.created_by?.profile?.profile_pic ?? defaultThumbnail} className={classes.moduleContentAvatar} />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

export { IndividualLibrary }
