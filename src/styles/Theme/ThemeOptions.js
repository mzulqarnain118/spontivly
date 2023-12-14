// ** MUI Theme Provider
import { deepmerge } from '@mui/utils'

// ** Theme Override Imports
import palette from './Palette'
import spacing from './spacing'
import shadows from './shadows'
import breakpoints from './breakpoints'

const themeOptions = () => {
  // ** Vars
  const themeColor = "primary"; // Change this based on your desired theme color
  const mode = "light"; // Change this based on your desired theme mode

  const themeConfig = {
    palette: palette(mode, themeColor),
    typography: {
      fontFamily: ["Inter", "Public Sans, sans-serif"].join(","),
    },
    shadows: shadows(mode),
   spacing,
    breakpoints: breakpoints(),
    shape: {
      borderRadius: 6,
    },
    mixins: {
      toolbar: {
        minHeight: 64,
      },
    },
  };

  return deepmerge(themeConfig, {
    palette: {
      primary: {
        ...themeConfig.palette[themeColor],
      },
    },
  });
}

export default themeOptions
