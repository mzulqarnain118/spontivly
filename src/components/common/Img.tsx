import { ClassNameMap } from '@mui/material'
import { commonStyles } from '../../styles/commonStyles'

export function Img({ src, className, alt, width, type, ...others }: any) {
  const classes: ClassNameMap<any> = commonStyles()

  return (
    <img
      alt={alt}
      style={{ width: type == 'icon' ? '48px' : type == 'smallIcon' ? '12px' : width }}
      src={src}
      className={type === 'logo' ? classes.logo : className}
      loading={'lazy'}
      {...others}
    />
  )
}
