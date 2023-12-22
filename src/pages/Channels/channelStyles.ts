// channelStyles.js
import { makeStyles } from '@mui/styles'

const channelStyles = makeStyles((theme: any) => ({
  container: {
    p: 0,
    border: `1px solid ${theme.palette.primary.lightest}`,
    boxShadow: 'none',
    borderRadius: '8px'
  }
}))

export { channelStyles }
