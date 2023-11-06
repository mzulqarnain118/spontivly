import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#262626", // Your primary color
    },
    secondary: {
      main: "#8C8C8C", // Your secondary color
    },
    background: {
      paper: "#FFF", // Background color for paper elements
      default: "#F5F5F5", // Default background color
    },
    text: {
      primary: "#333", // Primary text color
      secondary: "#777", // Secondary text color
    },
  },
  typography: {
    fontFamily: "Public Sans, sans-serif", // Your default font family
  },
  breakpoints: {
    values: {
      xs: 0, // Extra small screens (phones)
      sm: 600, // Small screens (tablets)
      md: 960, // Medium screens (small desktops)
      lg: 1280, // Large screens (desktops)
      xl: 1920, // Extra-large screens
    },
  },
  spacing: 8, // The base spacing unit
  // Other theme properties...
});

export default theme;
