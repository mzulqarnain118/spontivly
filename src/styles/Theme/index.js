import { createTheme } from "@mui/material/styles";
import commonTypography from "./Typography";
import Palette from "./Palette";

// Additional customization options
const borderRadius = "8px";
const boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
const spacingUnit = 8;

const customTypography = (theme) => ({
  ...commonTypography(theme),
  // Add any additional custom typography styles if needed
});

const themeColor = "primary"; // Change this based on your desired theme color
const themeMode = "light"; // Change this based on your desired theme mode

const theme = createTheme({
  palette: {
    ...Palette(themeMode, themeColor),
    background: {
      paper: "#FFF", // Set the default background color to white
      default: "#FFF", // Set the default background color to white
    },
  },
  typography: {
    fontFamily: "Public Sans, sans-serif", // Your default font family
    ...customTypography,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  spacing: spacingUnit,
  shape: {
    borderRadius,
  },
  shadows: [boxShadow],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius,
          boxShadow,
          padding: "16px 20px !important", // Set the default padding
          fontSize: "14px !important",
          fontStyle: "normal !important",
          fontWeight: "600 !important",
          color: ({ color }) => (color ? color : "inherit"),
          backgroundColor: ({ color }) => (color ? "transparent" : "inherit"),
          "&:disabled": {
            backgroundColor: "#ADB2B6",
          },
        },
        outlined: {
          "&:disabled": {
            backgroundColor: "inherit",
          },
        },
        sizeSmall: {
          width: "10%", // Set the width to 10% for small size
        },
        sizeMedium: {
          width: "15%", // Set the width to 15% for medium size
        },
        sizeLarge: {
          width: "100%", // Set the width to 15% for medium size
        },
      },
    },
    // Add more component customizations as needed
  },
  // Other theme properties...
});

export default theme;
