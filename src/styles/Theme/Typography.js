const Typography = (theme) => {
  return {
    h1: {
      fontWeight: 600,
      letterSpacing: '-1.5px',
      color: theme.palette.primary.main
    },
    h2: {
      fontWeight: 600,
      letterSpacing: '-0.5px',
      color: theme.palette.primary.main
    },
    h3: {
      //48px fontSize
      fontWeight: 600,
      color: theme.palette.primary.main
    },
    h4: {
      //34px fontSize
      fontWeight: 600,
      letterSpacing: '0.25px',
      color: theme.palette.primary.main
    },
    h5: {
      //24px fontsize
      fontWeight: 600,
      color: theme.palette.primary.main
    },
    h6: {
      letterSpacing: '0.15px',
      color: theme.palette.primary.main
    },
    subtitle: {
      fontSize: '15px',
      fontWeight: 600,
      color: theme.palette.primary.light
    },
    subtitle1: {
      fontSize: '14px',
      fontWeight: 400,
      color: theme.palette.primary.main
    },
    lightSubtitle1: {
      fontSize: '14px',
      fontWeight: 400,
      color: theme.palette.primary.light
    },
    lighterSubtitle2: {
      color: theme.palette.primary.lighter,
      fontSize: '13px',
      fontWeight: 400
    },
    lightSubtitle2: {
      color: theme.palette.primary.light,
      fontSize: '12px',
      fontWeight: 400
    },
    subtitle2: {
      color: theme.palette.primary.main,
      fontSize: '12px',
      fontWeight: 400
    },
    author: {
      color: theme.palette.text.customColor,
      fontSize: '1rem',
      fontWeight: 600
    },
    body1: {
      letterSpacing: '0.15px',
      color: theme.palette.text.primary
    },
    body2: {
      lineHeight: 1.5,
      letterSpacing: '0.15px',
      color: theme.palette.text.secondary
    },
    button: {
      letterSpacing: '0.3px',
      color: theme.palette.text.primary
    },
    caption: {
      letterSpacing: '0.4px',
      color: theme.palette.text.secondary
    },
    overline: {
      letterSpacing: '1px',
      color: theme.palette.text.secondary
    }
  }
}

export { Typography }
