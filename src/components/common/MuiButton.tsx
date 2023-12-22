import { Button } from '@mui/material'
import { Controls as common } from '../../components/common'

export function MuiButton({
  className,
  label,
  endIcon,
  startIcon,
  disabled,
  children,
  variant,
  size,
  bgcolor,
  color,
  onClick,
  style,
  startCustomIcon,
  endCustomIcon,
  minWidth,
  ...other
}: any) {
  return (
    <Button
      variant={variant ?? 'outlined'}
      label={label}
      size={size ?? 'small'}
      disabled={disabled}
      className={className}
      onClick={onClick}
      startIcon={startCustomIcon ? <common.Img src={startCustomIcon} /> :startIcon}
      endIcon={endCustomIcon ? <common.Img src={endCustomIcon} /> :endIcon}
      sx={{
        backgroundColor: bgcolor && `${bgcolor}`,
        textTransform: 'none',
        color: color,
        minWidth: minWidth
      }}
      {...other}
    >
      {label}
      {children}
    </Button>
  )
}
