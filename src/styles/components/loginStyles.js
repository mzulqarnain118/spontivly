import { makeStyles } from '@mui/styles'

export const loginStyles = makeStyles((theme) => ({
  container: {
    display: 'flex !important',
    flexDirection: 'column',
    gap: '1.5rem',
    alignItems: 'center !important' // Center the items vertically
  },

  subContainer: {
    display: 'flex !important',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  divider: {
    width: '13rem',
    color: theme.palette.grey[400]
  },
  dividerText: {
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.palette.grey[400]
  },
  bodyText: {
    fontSize: '0.75rem',
    lineHeight: '1.125rem',
    color: '#8C8C8C'
  },
  createAccountLink: {
    textDecoration: 'none',
    color: '#8C8C8C'
  }
}))
