// ** MUI Imports
import CssBaseline from "@mui/material/CssBaseline";
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles";

// ** Theme Config
import themeConfig from "./themeConfig";

// ** Theme Override Imports
import overrides from "./overrides";
import typography from "./Typography";

// ** Theme
import themeOptions from "./ThemeOptions";

const Theme = ({ children }) => {
  // ** Props

  // ** Merged ThemeOptions of Core and User
  const coreThemeConfig = themeOptions();

  // ** Pass ThemeOptions to CreateTheme Function to create partial theme without component overrides
  let theme = createTheme(coreThemeConfig);
  // ** Continue theme creation and pass merged component overrides to CreateTheme function
  theme = createTheme(theme, {
    components: { ...overrides(theme) },
    typography: { ...typography(theme) },
  });

  // ** Set responsive font sizes to true
  if (themeConfig.responsiveFontSizes) {
    theme = responsiveFontSizes(theme);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default Theme;
