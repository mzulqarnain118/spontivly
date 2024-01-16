// ** React Imports
import { ArrowBackIosNew } from '@mui/icons-material'
import Box, { BoxProps } from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import unAuthorized from '../../assets/images/pages/401.png'
import notFound from '../../assets/images/pages/404.png'
import internalServer from '../../assets/images/pages/500.png'
import { Controls as common } from '../../components/common'
import { BlankLayout } from './BlankLayout'

// ** Styled Components
const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    width: '90vw'
  }
}))

const Img = styled('img')(({ theme }) => ({
  marginBottom: theme.spacing(10),
  [theme.breakpoints.down('lg')]: {
    height: 450,
    marginTop: theme.spacing(10)
  },
  [theme.breakpoints.down('md')]: {
    height: 400
  },
  [theme.breakpoints.up('lg')]: {
    marginTop: theme.spacing(13)
  }
}))

const errorImages = { 404: notFound, 500: internalServer, 401: unAuthorized }
const errorText = { 404: 'Page Not Found ⚠️', 500: 'Internal server error 👨🏻‍💻', 401: 'You are not authorized! 🔐' }
const errorDesc = {
  404: `We couldn't find the page you are looking for.`,
  500: 'Oops, something went wrong!',
  401: `You don't have permission to access this page. Go Home!`
}
const Error = ({ errorCode }) => {
  return (
    <Box className="content-center">
      <Box sx={{ p: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <BoxWrapper>
          <Typography variant="h1">{errorCode}</Typography>
          <Typography variant="h5" sx={{ mb: 1, fontSize: '1.5rem !important' }}>
            {errorText[errorCode]}
          </Typography>
          <Typography variant="body2">{errorDesc[errorCode]}</Typography>
        </BoxWrapper>
        <Img height="487" alt="error-illustration" src={errorImages[errorCode]} />
        <Link to="/">
          <common.MuiButton variant="contained" label="Back to Home" size="large" startIcon={<ArrowBackIosNew />} />
        </Link>
      </Box>
    </Box>
  )
}

Error.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export { Error }
