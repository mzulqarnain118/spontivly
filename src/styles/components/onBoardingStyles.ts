import { Chip } from '@mui/material'
import MuiAppBar from '@mui/material/AppBar'
import { styled } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'

const drawerWidth = 313
const onBoarding = makeStyles((theme: any) => ({
  toolbar: {
    color: 'black',
    display: 'flex',
    alignItems: 'center',
    gap: '1.25rem'
  },
  toolbarIcon: {
    outline: '1px solid var(--petroleum-p-30, #BFC9D2) !important',
    borderRadius: '4px !important',
    marginRight: '2px !important'
  },
  label: {
    color: 'var(--text-primary, #222) !important',
    fontSize: '14px !important',
    fontStyle: 'normal',
    fontWeight: '600 !important'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      width: drawerWidth,
      boxSizing: 'border-box',
      backgroundColor: '#FAFAFA',
      boxShadow: '-4px 0px 20px 0px rgba(0, 0, 0, 0.05) inset'
    }
  },
  link: {
    color: ' var(--brand-complimentary, #323E48)',
    fontSize: '12px',
    fontStyle: 'normal',
    fontWeight: 700
  },
  sidebarHeader: {
    fontSize: '1.5rem !important',
    fontStyle: 'normal !important',
    fontWeight: '600 !important',
    padding: '15px !important'
  },
  list: {
    display: 'inline-flex',
    padding: '2rem 1.5rem !important',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '1.25rem'
  },
  listItemButton: {
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: 600
  },
  listItemIcon: {
    width: '1.62rem',
    padding: '0.25rem',
    borderRadius: '12px',
    border: `1px solid ${theme.palette.primary.main}`
  },
  listItemSuccessIcon: {
    width: '1.62rem',
    padding: '2px'
  },
  drawerHeader: {
    display: 'flex !important',
    padding: '1rem 1.5rem !important',
    justifyContent: 'space-between !important',
    alignItems: 'center !important'
  },
  mainContainer: {
    display: 'flex !important',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '80px'
  },
  drawerFooter: {
    display: 'flex !important'
    // flexDirection: 'column !important'
  },
  mobileStepper: {
    padding: '0px !important',
    justifyContent: 'center !important',
    '& .MuiMobileStepper-progress': {
      width: '100% !important',
      background: theme.palette.grey[300]
    },
    '& .MuiLinearProgress-bar': {
      backgroundColor: theme.palette.primary.main
    }
  },
  footerButtonDiv: {
    display: 'flex !important',
    justifyContent: 'space-between !important',
    alignItems: 'center !important',
    padding: '20px !important'
  }
}))
const Main = styled<any>('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }: any) => ({
  flexGrow: 1,
  padding: theme?.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: `${drawerWidth}px`
  })
}))

const AppBar = styled<any>(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }: any) => ({
  boxShadow: 'none',
  backgroundColor: 'white',
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}))
const DrawerFooter = styled<any>(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }: any) => ({
  top: 'auto',
  bottom: 0,
  boxShadow: 'none',
  backgroundColor: 'white',
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}))

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme?.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end'
}))

const StyledChip = styled(Chip)(({}) => ({
  position: 'relative',
  '& .MuiChip-deleteIcon': {
    position: 'absolute',
    right: -12,
    top: -12,
    borderRadius: '50%',
    border: '1px solid rgba(233, 237, 240, 1) !important',
    background: 'white',
    color: 'black',
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background 0.3s',
    '&:hover': {
      border: '1px solid rgba(233, 237, 240, 1)',
      background: 'rgba(50, 62, 72, 1)',
      color: 'white'
    }
  },
  '& .MuiChip-deleteIcon::before, & .MuiChip-deleteIcon::after': {
    content: '""',
    width: '50%',
    height: '2px',
    background: 'black',
    position: 'absolute',
    top: 'calc(50% - 1px)'
  },
  '& .MuiChip-deleteIcon::before': {
    left: 0,
    transform: 'rotate(45deg)'
  },
  '& .MuiChip-deleteIcon::after': {
    right: 0,
    transform: 'rotate(-45deg)'
  }
}))

export { onBoarding, Main, AppBar, DrawerFooter, DrawerHeader, StyledChip }
