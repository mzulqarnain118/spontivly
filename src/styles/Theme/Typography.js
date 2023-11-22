
const Typography = (theme) => {
  return {
    h1: {
      fontWeight: 600,
      letterSpacing: "-1.5px",
      color: theme.palette.primary,
    },
    h2: {
      fontWeight: 600,
      letterSpacing: "-0.5px",
      color: theme.palette.primary,
    },
    h3: {
      //48px fontSize
      fontWeight: 600,
      color: theme.palette.primary,
    },
    h4: {
      //34px fontSize
      fontWeight: 600,
      letterSpacing: "0.25px",
      color: theme.palette.primary,
    },
    h5: {
      //24px fontsize
      fontWeight: 600,
      color: theme.palette.primary,
    },
    h6: {
      letterSpacing: "0.15px",
      color: theme.palette.primary,
    },
    subtitle1: {
      fontSize: "14px",
      fontWeight: 400,
      color: theme.palette.customColors.subtitle1,
    },
    subtitle2: {
      color: theme.palette.customColors.subtitle2,
      fontSize: "13px",
      fontWeight: 400,
    },
    body1: {
      letterSpacing: "0.15px",
      color: theme.palette.text.primary,
    },
    body2: {
      lineHeight: 1.5,
      letterSpacing: "0.15px",
      color: theme.palette.text.secondary,
    },
    button: {
      letterSpacing: "0.3px",
      color: theme.palette.text.primary,
    },
    caption: {
      letterSpacing: "0.4px",
      color: theme.palette.text.secondary,
    },
    overline: {
      letterSpacing: "1px",
      color: theme.palette.text.secondary,
    },
  };
};

export default Typography;
