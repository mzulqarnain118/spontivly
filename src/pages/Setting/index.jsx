import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Box, Card, CardContent, CardHeader, Collapse, IconButton } from '@mui/material'
import { styled } from '@mui/material/styles'
import React, { useState } from 'react'
import { Bio } from './Bio'
import { ProfileContent } from './ProfileContent'
import { SocialAuths } from './SocialAuths'
import { UpdatePassword } from './UpdatePassword'

const panels = [
  {
    key: 'profile',
    title: 'Profile',
    subheader: 'This information will be displayed publicly so be careful what you share.',
    component: <ProfileContent />
  },
  {
    key: 'bio',
    title: 'Bio',
    subheader: 'Add additional details for your directory profile',
    component: <Bio />
  },
  {
    key: 'social',
    title: 'Social Integerations',
    subheader: 'Your social media profiles.',
    component: <SocialAuths />
  },
  {
    key: 'password',
    title: 'Update Password',
    subheader: 'By changing your password, you help make sure that only you can use your account.',
    component: <UpdatePassword />
  }
]

const Setting = () => {
  const [expanded, setExpanded] = useState({})

  const handleExpandClick = (panel) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [panel]: !prevExpanded[panel]
    }))
  }

  return (
    <Box display="flex" flexDirection="column" mt={15}>
      {panels?.map((panel) => (
        <Card key={panel?.key} sx={{ mb: 10 }}>
          <CardHeader
            sx={{ borderBottom: '1px solid #e0e0e0' }}
            action={
              <ExpandMore
                expand={expanded[panel?.key] || false}
                onClick={() => handleExpandClick(panel?.key)}
                aria-expanded={expanded[panel?.key]}
                aria-label="show more"
              >
                <ExpandMoreIcon fontSize="large" />
              </ExpandMore>
            }
            titleTypographyProps={{ sx: { textAlign: 'left' } }}
            subheaderTypographyProps={{ sx: { textAlign: 'left' } }}
            title={panel?.title}
            subheader={panel?.subheader}
          />
          <Collapse in={expanded[panel?.key]} timeout="auto" unmountOnExit>
            <CardContent>{panel?.component}</CardContent>
          </Collapse>
        </Card>
      ))}
    </Box>
  )
}

export { Setting }

const ExpandMore = styled((props) => {
  const { expand, ...other } = props

  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  })
}))
