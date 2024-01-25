import { Link as RouterLink } from 'react-router-dom'
import { commonStyles } from '../../styles'

export function Link({ label, to, style }) {
  const classes = commonStyles()

  return <RouterLink style={style} to={to} className={classes.Link}>{` ${label} `}</RouterLink>
}
