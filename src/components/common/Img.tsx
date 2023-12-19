import { ClassNameMap } from '@mui/material'
import commonStyles from '../../styles/commonStyles'

export default function Img({ src, className, type, onClick, ...others }: any) {
  const classes: ClassNameMap<any> = commonStyles()

  return (
    <img
      alt="Image"
      style={{ width: type == 'icon' ? '48px' : type == 'smallIcon' && '12px' }}
      src={src}
      onClick={onClick}
      className={className ? className : type === 'logo' && classes.logo}
      loading="lazy"
      {...others}
    />
  )
}
