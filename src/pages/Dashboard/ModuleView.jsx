import { Avatar, Box, Chip, Grid, Typography } from '@mui/material'
import React from 'react'
import youtube from '../../assets/icons/youtube.png'
import { Controls as common } from '../../components/common'
import { libraryStyles } from '../../styles/components/libraryStyles'
import { handleShowYoutubeThumbnail } from '../../utils'
import { thumbnails } from './Library'

const ModuleView = ({ libraryData, typeIcons, moreOptions, handleMoreClick, openLibraryInfo }) => {
  const classes = libraryStyles()
  const moduleTypesIcons = { ...typeIcons, youtube }

  return (
    <Grid container spacing={5} padding={'0.75rem 1.5rem'}>
      {libraryData?.map((library) => (
        <Grid key={library.id} item xs={12} sm={6} md={4} lg={4} mt={'1.25rem'} className="cursor" onClick={() => openLibraryInfo(library)}>
          <Box>
            <div className="relative-full-width">
              <common.Img
                src={handleShowYoutubeThumbnail(library.url, library.type) ?? thumbnails?.[library?.type]}
                className={classes.moduleContentImg}
              />
              <div className={classes.moduleContentSource}>
                <common.Img type="smallIcon" src={moduleTypesIcons[library.type]} />
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
                  <Avatar src={library?.created_by?.profile?.profile_pic} className={classes.moduleContentAvatar} />
                  <common.MenuList
                    items={moreOptions(library?.created_by?.id, library?.i_saved)}
                    onClose={(e) => handleMoreClick(e, library)}
                    icon="MoreVert"
                    tooltip="Open settings"
                  />
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  )
}

export { ModuleView }
