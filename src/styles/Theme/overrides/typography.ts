// Typography.ts
import { Theme } from '@mui/material/styles'

interface CustomTypographyVariants {
  MuiTypography: {
    styleOverrides: {
      gutterBottom?: {
        marginBottom: string
      }
    }
    variant?:
      | 'inherit'
      | 'h1'
      | 'h2'
      | 'h3'
      | 'h4'
      | 'h5'
      | 'h6'
      | 'h8'
      | 'subtitle1'
      | 'subtitle2'
      | 'body1'
      | 'body2'
      | 'button'
      | 'caption'
      | 'overline'
      | 'author'
      | 'lighterSubtitle2' // Add your custom variant names here
  }
}

const Typography = (theme: Theme): CustomTypographyVariants => {
  return {
    MuiTypography: {
      styleOverrides: {
        gutterBottom: {
          marginBottom: theme.spacing(2)
        }
      },
      // Provide a value for 'variant'
      variant: 'inherit'
    }
  }
}

export { Typography }
