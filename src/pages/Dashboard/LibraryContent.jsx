import { Avatar, Box, Chip, Grid, Typography } from '@mui/material'
import moment from 'moment'
import React from 'react'
import defaultThumbnail from '../../assets/images/dummy.png'
import { Controls as common } from '../../components/common'
import { libraryStyles } from '../../styles/components/libraryStyles'
import { handleShowYoutubeThumbnail } from '../../utils'
import { useSelector } from 'react-redux'

const LibraryContent = ({ libraryData, typeIcons, moreOptions, handleMoreClick, openLibraryInfo }) => {
  const classes = libraryStyles()
  const { userId, isModerator } = useSelector((state) => state?.dashboard)

  return libraryData?.map((library) => (
    <Box key={library?.id} className={`${classes.mainBox} cursor`} onClick={() => openLibraryInfo(library)}>
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
          <common.MenuList
            items={moreOptions(library?.created_by?.id, library?.i_saved)}
            onClose={(item) => handleMoreClick(item, library)}
            icon="MoreHorizRounded"
          />
          <Typography variant="lightSubtitle2">{moment(library?.created_at).format('MMM DD, YYYY')}</Typography>
          <common.Img type="icon" src={typeIcons[library?.type]} />
          <Chip label={library?.status.toUpperCase() ?? 'DRAFT'} className={classes.libraryStatus} />
        </Grid>
      </Grid>
    </Box>
  ))
}

export { LibraryContent }
