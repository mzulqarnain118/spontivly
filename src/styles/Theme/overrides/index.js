// ** Overrides Imports
import { Button as MuiButton } from './button'
import { Grid as MuiGrid } from './grid'

const Overrides = (theme) => {
  const button = MuiButton(theme)
  const grid = MuiGrid(theme)

  return Object.assign(button, grid)
}

export { Overrides }
