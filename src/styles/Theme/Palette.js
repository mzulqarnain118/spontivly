const Palette = (mode, themeColor) => {
  // ** Vars
  const lightColor = '#2D3840' // Main color for light mode
  const darkColor = '#E7E3FC' // Main color for dark mode
  const mainColor = mode === 'light' ? lightColor : darkColor

  const primaryGradient = () => {
    if (themeColor === 'primary') {
      return '#262626' // Your primary color
    } else if (themeColor === 'secondary') {
      return '#8C8C8C' // Your secondary color
    } else if (themeColor === 'success') {
      return '#93DD5C'
    } else if (themeColor === 'error') {
      return '#FF8C90'
    } else if (themeColor === 'warning') {
      return '#FFCF5C'
    } else {
      return '#6ACDFF'
    }
  }

  return {
    customColors: {
      main: mainColor,
      primaryGradient: primaryGradient(),
      tableHeaderBg: mode === 'light' ? '#FFF' : '#312D4B',
      borderColor: themeColor === 'primary' ? '#93A5B4' : '#93A5B4'
    },
    common: {
      black: '#000',
      white: '#FFF'
    },
    mode: mode,
    primary: {
      lighter: '#93A5B4',
      lightest: '#E9EDF0',
      light: `#698296`,
      main: '#2D3840',
      dark: '#2D3840',
      contrastText: '#FFF'
    },
    secondary: {
      lightest: '#F9FBFD',
      light: '#9C9FA4',
      main: '#2D3840',
      dark: '#777B82',
      contrastText: '#FFF',
      lighter: '#F7F7F7'
    },
    success: {
      light: '#6AD01F',
      main: '#56CA00',
      dark: '#4CB200',
      contrastText: '#FFF'
    },
    error: {
      light: '#FF6166',
      main: '#FF4C51',
      dark: '#E04347',
      contrastText: '#FFF'
    },
    warning: {
      light: '#FFCA64',
      main: '#FFB400',
      dark: '#E09E00',
      contrastText: '#FFF'
    },
    info: {
      light: '#32BAFF',
      main: '#16B1FF',
      dark: '#139CE0',
      contrastText: '#FFF'
    },
    grey: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
      A100: '#D5D5D5',
      A200: '#AAAAAA',
      A400: '#616161',
      A700: '#303030'
    },
    text: {
      primary: `rgba(${mainColor}, 0.87)`,
      secondary: `rgba(${mainColor}, 0.68)`,
      disabled: `rgba(${mainColor}, 0.38)`,
      customColor: '#4B5D6B'
    },
    divider: `rgba(${mainColor}, 0.12)`,
    background: {
      paper: mode === 'light' ? '#FFF' : '#312D4B',
      default: mode === 'light' ? '#FFF' : '#28243D'
    },
    action: {
      active: `rgba(${mainColor}, 0.54)`,
      hover: `rgba(${mainColor}, 0.04)`,
      selected: `rgba(${mainColor}, 0.08)`,
      disabled: `rgba(${mainColor}, 0.3)`,
      disabledBackground: `rgba(${mainColor}, 0.18)`,
      focus: `rgba(${mainColor}, 0.12)`
    }
  }
}

export { Palette }
