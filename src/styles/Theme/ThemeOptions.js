// ** MUI Theme Provider
import { deepmerge } from '@mui/utils'

// ** Theme Override Imports
import { breakpoints } from './breakpoints'
import { Palette as palette } from './Palette'
import { Shadows as shadows } from './shadows'
import { spacing } from './spacing'

const themeOptions = () => {
  // ** Vars
  const themeColor = 'primary' // Change this based on your desired theme color
  const mode = 'light' // Change this based on your desired theme mode

  const themeConfig = {
    palette: palette(mode, themeColor),
    typography: {
      fontFamily: ['Inter', 'Public Sans, sans-serif'].join(',')
    },
    shadows: shadows(mode),
    spacing,
    breakpoints: breakpoints(),
    shape: {
      borderRadius: 6
    },
    mixins: {
      toolbar: {
        minHeight: 64
      }
    }
  }

  return deepmerge(themeConfig, {
    palette: {
      primary: {
        ...themeConfig.palette[themeColor]
      }
    }
  })
}

export { themeOptions }
