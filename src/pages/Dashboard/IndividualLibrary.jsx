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
    <div key={library?.id}>
      <Grid item xs={12} className={classes.hoverIcon}>
        <Chip label={library?.libraryStatus ?? 'DRAFT'} className={classes.libraryStatus} />
      </Grid>
      <Box className={`${classes.mainBox} cursor`} onClick={() => handleOpenUrlInNewTab(library?.url)}>
        <common.Img src={handleShowYoutubeThumbnail(library?.url, library?.type) || defaultThumbnail} className={classes.contentImg} />
        <Grid container>
          <Grid item xs={10} sm={10} md={10}>
            <Box className="col-start gap-025">
              <Typography sx={{ fontWeight: 600 }} align="left">
                {library?.title}
              </Typography>
              <Typography variant="lightSubtitle1" align="left" dangerouslySetInnerHTML={{ __html: library?.summary }} />
              <Box className="flex">
                <Avatar src={library?.created_by?.profile?.profile_pic || defaultThumbnail} alt="Media" className={classes.contentAvatar} />
                <Typography variant="subtitle2">{`${library?.created_by?.first_name} ${library?.created_by?.last_name}`}</Typography>
              </Box>

              <Box className={classes.flexStart}>
                {library?.tags?.map((tag) => (
                  <Chip key={tag?.title} label={tag?.title} className={classes.contentChip} />
                ))}
              </Box>
            </Box>
          </Grid>

          <Grid item xs={2} className="col-between">
            <Typography variant="lightSubtitle2">{moment(library?.created_at).format('MMM DD, YYYY')}</Typography>
            <common.Img type="icon" src={typeIcons[library?.type]} />
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}

export { IndividualLibrary }
