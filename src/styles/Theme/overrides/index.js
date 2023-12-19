// ** Overrides Imports
import MuiButton from './button'

const Overrides = (theme) => {
  const button = MuiButton(theme)

  return Object.assign(button)
}

export default Overrides
