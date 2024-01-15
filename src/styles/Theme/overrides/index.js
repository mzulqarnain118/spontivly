// ** Overrides Imports
import { Button as MuiButton } from './button'
import { Grid as MuiGrid } from './grid'
import { Typography as MuiTypography } from './typography'

const Overrides = (theme) => {
  const button = MuiButton(theme)
  const grid = MuiGrid(theme)
  const typography = MuiTypography(theme)

  return Object.assign(button, grid, typography)
}

export { Overrides }
