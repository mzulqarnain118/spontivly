// ** Overrides Imports
import { Button as MuiButton } from './button'

const Overrides = (theme) => {
  const button = MuiButton(theme)

  return Object.assign(button)
}

export { Overrides }
