// channelStyles.js
import { makeStyles } from '@mui/styles'

const channelStyles = makeStyles((theme: any) => ({
  container: {
    p: 0,
    border: `1px solid ${theme.palette.primary.lightest}`,
    boxShadow: 'none',
    borderRadius: '8px',
    width:"100%"
  },
  postThumbnail: { width: '100%', height: '100%', objectFit: 'contain', borderRadius: '8px' },
  eventMonthName: {
    padding: '0px 8px',
    alignSelf: 'stretch',
    backgroundColor: '#D82C0D',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px'
  },
  eventCalender: {
    border: '1px solid #E4E4E4',
    borderRadius: '8px',
    fontWeight: 700,
    textTransform: 'uppercase'
  },
  card: {
    borderColor: theme.palette.primary.main,
    borderWidth: 2,
    borderStyle: 'solid',
  }
}))

export { channelStyles }
