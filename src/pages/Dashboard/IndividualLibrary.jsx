import { Avatar, Card, CardContent, Box, Chip, Grid, Typography, Link } from '@mui/material'
import moment from 'moment'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Controls as common } from '../../components/common'
import { libraryStyles } from '../../styles/components/libraryStyles'
import { handleOpenUrlInNewTab, handleShowYoutubeThumbnail } from '../../utils'
import { thumbnails, typeIcons } from './Library'

const IndividualLibrary = () => {
  const navigate = useNavigate()
  const classes = libraryStyles()
  const location = useLocation()
  const library = location.state?.library

  return (
    <>
      <Box className="row-start" sx={{ mt: 5, mb: 5 }}>
        <Typography className="cursor" variant="h4" display="flex" alignItems="center">
          <Link variant="h5" onClick={() => navigate(-1)} color="inherit" underline="hover">
            Library
          </Link>
          <common.MuiIcon name="ArrowForwardIos" sx={{ ml: '4px' }} />
        </Typography>
        <Typography variant="h6">{library.title}</Typography>
      </Box>
      <Card>
        <CardContent>
          <Grid container>
            <Grid key={library.id} item xs={12} mt={'1.25rem'} className="cursor">
              <Box>
                <div className="col-end gap-05">
                  <div className="relative-full-width">
                    <common.Img
                      src={handleShowYoutubeThumbnail(library.url, library.type)  ?? thumbnails[library?.type]}
                      className={classes.individualContentImg}
                    />
                    <div className={classes.moduleContentSource}>
                      <common.Img type="smallIcon" src={typeIcons[library.type]} />
                    </div>
                  </div>
                  <common.MuiButton
                    minWidth="100%"
                    size="large"
                    onClick={() => handleOpenUrlInNewTab(library.url)}
                    label="Go To The External Link Of This Content"
                  />
                  <Typography variant="lightSubtitle2">{moment(library?.created_at).format('MMM DD, YYYY')}</Typography>
                  <Box className="row gap-1">
                    <Grid item xs={1}>
                      <Avatar src={library?.created_by?.profile?.profile_pic ?? thumbnails[library?.type]} className={classes.moduleContentAvatar} />
                    </Grid>
                    <Typography>{`${library?.created_by?.first_name} ${library?.created_by?.last_name}`}</Typography>
                  </Box>
                  <Chip label={library?.status.toUpperCase() ?? 'DRAFT'} className={classes.libraryStatus} />
                </div>
                <div className="divider"></div>

                <Box mt={'12px'}>
                  <Grid container spacing={2}>
                    <Grid item xs={11} sm={11} md={11} lg={11}>
                      <Typography sx={{ fontWeight: 600, mb: 3 }} align="left">
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
                  </Grid>
                  <Typography align="left" dangerouslySetInnerHTML={{ __html: library?.description }} />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>{' '}
    </>
  )
}

export { IndividualLibrary }
