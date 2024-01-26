import { makeStyles } from '@mui/styles'
const commonStyles = makeStyles((theme) => ({
  heading: {
    textAlign: 'center !important',
    fontSize: '36px !important',
    fontStyle: 'normal !important',
    fontWeight: '600 !important'
  },
  title: {
    fontSize: '16px',
    lineHeight: '20px',
    color: '#698296'
  },
  whiteTitle: {
    color: '#FFF',
    textAlign: 'center !important',
    fontSize: '1rem !important',
    fontStyle: 'normal !important',
    fontWeight: '600 !important'
  },
  Link: {
    color: theme.palette.primary.main, // Set the default color for links
    textDecoration: 'none' // Remove underline
  },
  inputContainer: {
    border: theme.palette.primary.lighter,
    background: theme.palette.secondary.lightest,
    textAlign: 'start'
  },
  editor: {
    textAlign: 'left'
  },
  logo: {
    width: '15.75194rem',
    height: '5rem',
    marginTop: 128
  },
  container: {
    display: 'flex !important'
  },
  mainContainer: {
    width: '100% !important',
    gap: '1.5rem !important',
    display: 'flex !important',
    flexDirection: 'column !important',
    alignItems: 'center !important'
  },
  chipContainer: {
    display: 'flex !important',
    flexWrap: 'wrap !important',
    justifyContent: 'center !important',
    gap: '10px !important'
  },
  selectedchipContainer: {
    display: 'flex !important',
    flexWrap: 'wrap !important',
    justifyContent: 'center !important',
    gap: '10px !important'
  },
  chip: {
    height: '52px !important',
    margin: '8px !important',
    padding: '16px 40px !important',
    borderRadius: '60px !important',
    border: '1px solid var(--petroleum-p-30, #BFC9D2) !important'
  },
  base: {
    color: 'white ',
    borderRadius: '60px ',
    border: '1px solid var(--petroleum-p-30, #BFC9D2) ',
    background: theme.palette.primary.main,
    position: 'absolute',
    right: 208,
    top: 176,
    width: '24px ',
    height: '24px '
  },
  selectedChip: {
    color: 'white !important',
    height: '52px !important',
    margin: '8px !important', // Adjust the margin as needed
    padding: '16px 40px !important',
    borderRadius: '60px !important',
    border: '1px solid var(--petroleum-p-30, #BFC9D2) !important',
    background: 'var(--brand-complimentary, #323E48) !important',
    '& .MuiChip-deleteIcon': {
      position: 'absolute !important',
      padding: '1px !important',
      right: -12,
      top: -12,
      width: '24px !important',
      height: '24px !important',
      display: 'flex !important',
      alignItems: 'center !important',
      justifyContent: 'center !important',
      transition: 'background 0.3s !important',
      color: 'black !important',
      borderRadius: '50% !important',
      border: '1px solid rgba(233, 237, 240, 1) !important',
      background: 'white !important'
    }
  },
  textArea: {
    marginTop: '24px',
    border: '1px solid var(--petroleum-p-45, #93A5B4) !important',
    background: 'var(--petroleum-p-05, #F9FBFD)',
    borderRadius: '0px',
    width: '100%',
    overflowY: 'auto',
    '&:focus': {
      outline: 'none' // Remove the focus outline
    },
    [theme.breakpoints.up('md')]: {
      width: '34.1875rem',
      height: '11.34rem' // Adjust width for screens wider than 'md' breakpoint
    } // Initially use full width
  },
  profileImage: {
    padding: '8px !important',
    marginTop: '40px!important',
    width: '96px !important',
    height: '96px !important',
    borderRadius: '99px !important'
  },
  settingsProfileImage: {
    padding: '8px !important',
    width: '96px !important',
    height: '96px !important',
    borderRadius: '99px !important'
  }
}))

export { commonStyles }
