import { Container, Grid, Box, useMediaQuery, useTheme } from '@mui/material'
import { ResponsiveAppBar } from "pages/Dashboard/ResponsiveAppBar";
import { Outlet } from "react-router-dom";
const containerStyles = {
  width: '80vw',
  margin: '80px auto 0',
  padding: '20px',
  p: 3
}
const Layout = () => {
  const isBelowLG = useMediaQuery(theme.breakpoints.down('lg'))
  const [Panel, setPanel] = useState(false)
  const [EventsPanel, setEventsPanel] = useState(false)
  return (
    <>
      <ResponsiveAppBar setPanel={setPanel} setEventsPanel={setEventsPanel} Panel={Panel} isBelowLG={isBelowLG} />
      <Box component="main" sx={containerStyles}>
        <Outlet />
        </Box>
    </>
  )
}

export  {Layout}
